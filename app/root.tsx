import type {
  HeadersFunction,
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { Header } from "~/components";
import { AudioProvider, backupSong, Song } from "./context/AudioContext";
import NotFound from "./pages/NotFound";
import "./tailwind.css";
import { getSignedS3Url } from "./utils/s3-signed-url";
import songs from "./data/songs.json";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "bu.re_" },
    {
      content: "ambient musician / producer / saxophonist",
    },
  ];
};

export const links: LinksFunction = () => [
  {
    rel: "prefetch",
    as: "font",
    type: "font/ttf",
    crossOrigin: "anonymous",
    href: "/fonts/questrial/Questrial-Regular.ttf",
  },
];

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "public, max-age=300, s-maxage=300",
  };
};

export async function loader({}: LoaderFunctionArgs) {
  try {
    const queryClient = new QueryClient();

    // fetch signed urls for default song
    const defaultSongRes = await getSignedS3Url(
      `${process.env.BUCKET_BASE}${songs[0].audioS3}`,
    );
    const artworkRes = await getSignedS3Url(
      `${process.env.BUCKET_BASE}${songs[0].artworkS3}`,
    );

    if (!artworkRes.ok) {
      const error = await artworkRes.text();
      console.error("Failed to fetch artwork url", error);
      return { updatedSongs: [] };
    }

    if (!defaultSongRes.ok) {
      const error = await defaultSongRes.text();
      console.error("Failed to fetch default song url", error);
      return { updatedSongs: [] };
    }

    const artworkUrl = await artworkRes.json();
    const defaultSongUrl = await defaultSongRes.json();

    const updatedSongs: Song[] = songs.map((song, index) => {
      if (index === 0) {
        return {
          ...songs[0],
          audio: defaultSongUrl.url,
          artwork: artworkUrl.url,
        };
      } else return song;
    });

    const headers: HeadersInit = new Headers();
    headers.append("Content-Type", "application/json");

    return {
      updatedSongs,
      headers,
    };
  } catch (error) {
    console.error("Failed to fetch songs", error);
    return { updatedSongs: [] };
  }
}

export default function App() {
  const data = useLoaderData<typeof loader>();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 5,
          },
        },
      }),
  );

  queryClient.setQueryData(["songs"], data.updatedSongs);
  queryClient.setQueryData(["currentSong"], data.updatedSongs[0]);

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary>
        <AudioProvider>
          <html className="h-full scroll-smooth" lang="en">
            <head>
              <Meta />
              <meta charSet="utf-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <Links />
            </head>
            <body className="h-full bg-romance">
              <Header />
              <Outlet />
              <ScrollRestoration />
              <Scripts />
            </body>
          </html>
        </AudioProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return <NotFound />;
  }

  return (
    <html className="h-full" lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-romance">
        <Header />
        <NotFound />
        <Scripts />
      </body>
    </html>
  );
}
