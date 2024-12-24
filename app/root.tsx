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
    rel: "preload",
    as: "font",
    type: "font/ttf",
    href: "/fonts/questrial/Questrial-Regular.ttf",
  },
];

export async function loader({}: LoaderFunctionArgs) {
  const res = await fetch(`${process.env.API_BASE_URL}/api/s3-song`);

  if (!res.ok) {
    throw new Error("Failed to fetch songs");
  }

  const songs = await res.json();
  return { songs };
}

export default function App() {
  const data = useLoaderData<typeof loader>();

  return (
    <AudioProvider songUrl={data.songs[1].Key}>
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
