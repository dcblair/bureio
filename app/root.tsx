import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import NavBar from "./components/NavBar";
import NotFound from "./pages/NotFound";
import styles from "./styles/app.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "bu.re_",
  description: "ambient musician / producer",
  viewport: "width=device-width,initial-scale=1",
});

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
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  console.error(caught.status, caught.statusText);

  return (
    <html className="h-full scroll-smooth" lang="en">
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

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

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
