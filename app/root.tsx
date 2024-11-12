import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
  Outlet,
} from "@remix-run/react";
import { Header } from "~/components";
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

export default function App() {
  return (
    <html className="h-full scroll-smooth" lang="en">
      <head>
        <Meta />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="preload"
          href="/fonts/questrial/Questrial-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Zen_Kaku_Gothic_Antique/ZenKakuGothicAntique-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
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
