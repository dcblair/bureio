import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import NavBar from "./components/NavBar";
import NotFound from "./pages/NotFound";
import styles from "./styles/app.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => {
  return [
    {title: "bu.re_"},
    {
      content: "ambient musician / producer / saxophonist",
    },
  ]
};

export default function App() {
  return (
    <html className="scroll-smooth h-full" lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-romance h-full">
        <NavBar />
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
      <body className="bg-romance h-full">
        <NavBar />
        <NotFound />
        <Scripts />
      </body>
    </html>
  );
}
