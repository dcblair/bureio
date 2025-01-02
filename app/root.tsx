import type {
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
import { AudioProvider } from "./context/AudioContext";
import NotFound from "./pages/NotFound";
import "./tailwind.css";
import { fetchSongs } from "./utils/s3-song";

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

export async function loader({}: LoaderFunctionArgs) {
  try {
    const audioRes = await fetchSongs();

    if (!audioRes.ok) {
      throw new Error("Failed to fetch songs");
    }

    const songs = await audioRes.json();
    return { songs };
  } catch (error) {
    console.error("Failed to fetch songs", error);
    return { songs: [] };
  }
}

export default function App() {
  const data = useLoaderData<typeof loader>();

  console.log(data, "data");
  // set default song to "calling currents" if no songs are found
  const defaultSong = data.songs?.[1] || {
    Key: "/audio/calling-currents.wav",
    Metadata: {
      title: "calling currents",
      trackNumber: "3",
      album: "on letting go",
      artist: "bu.re_",
      artwork: "/images/webp/cropped-dsii-artwork-1440w.webp",
      audio: "/audio/calling-currents.wav",
    },
    ContentType: "audio/wav",
  };

  return (
    <AudioProvider defaultSong={defaultSong}>
      <html className="h-full scroll-smooth" lang="en">
        <head>
          <Meta />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
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
