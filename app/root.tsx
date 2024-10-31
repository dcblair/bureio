import type { MetaFunction } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
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

export default function App() {
  return (
    <html className="h-full scroll-smooth" lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-[#C9D5B5]">
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
