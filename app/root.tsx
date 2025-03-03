import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import type {
  HeadersFunction,
  LinksFunction,
  MetaFunction,
} from "react-router";
import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "react-router";
import { AudioPlayer, Header } from "~/components";
import { Route } from "./+types/root";
import { AudioProvider, Song } from "./context/AudioContext";
import songs from "./data/songs.json";
import NotFound from "./pages/NotFound";
import "./tailwind.css";
import { getSignedS3Url } from "./utils/s3-signed-url";

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

export async function loader({}: Route.LoaderArgs) {
  try {
    // fetch signed urls for audio and artwork for default song
    const defaultSongRes = await getSignedS3Url(
      `${process.env.BUCKET_BASE}${songs[0].audioS3}`,
    );
    const artworkRes = await getSignedS3Url(
      `${process.env.BUCKET_BASE}${songs[0].artworkS3}`,
    );

    if (!artworkRes.ok) {
      const error = await artworkRes.text();
      console.error("Failed to fetch artwork url", error);
      return data({ updatedSongs: [] });
    }

    if (!defaultSongRes.ok) {
      const error = await defaultSongRes.text();
      console.error("Failed to fetch default song url", error);
      return data({ updatedSongs: [] });
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

    return data({ updatedSongs });
  } catch (error) {
    console.error("Failed to fetch songs", error);
    return data({ updatedSongs: [] });
  }
}

export default function App({ loaderData }: Route.ComponentProps) {
  const { updatedSongs } = loaderData;
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

  queryClient.setQueryData(["songs"], updatedSongs);
  queryClient.setQueryData(["currentSong"], updatedSongs[0]);

  return (
    <html className="min-h-screen scroll-smooth" lang="en">
      <head>
        <Meta />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Links />
      </head>
      <body className="bg-romance">
        <QueryClientProvider client={queryClient}>
          <AudioProvider>
            <HydrationBoundary>
              <Header />
              <Outlet />
              <AudioProvider>
                <AudioPlayer />
              </AudioProvider>
            </HydrationBoundary>
          </AudioProvider>
          <ReactQueryDevtools buttonPosition="top-left" initialIsOpen={false} />
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
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
      <body className="bg-romance h-full">
        <Header />
        <NotFound />
        <Scripts />
      </body>
    </html>
  );
}
