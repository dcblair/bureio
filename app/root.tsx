import type { MetaFunction } from '@remix-run/node';
import {
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
  Outlet,
} from '@remix-run/react';
import { NavBar } from '~/components';
import NotFound from './pages/NotFound';
import './tailwind.css';

export const meta: MetaFunction = () => {
  return [
    { title: 'bu.re_' },
    {
      content: 'ambient musician / producer / saxophonist',
    },
  ];
};

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <html className="h-full scroll-smooth" lang="en">
      <head>
        <Meta />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Links />
      </head>
      <body className="h-full bg-romance">
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
      <body className="h-full bg-romance">
        <NavBar />
        <NotFound />
        <Scripts />
      </body>
    </html>
  );
}
