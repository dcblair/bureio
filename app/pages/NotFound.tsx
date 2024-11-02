import { Link } from '@remix-run/react';

export default function NotFound() {
  return (
    <div className="mt-0 flex size-full flex-col items-center justify-center text-center md:mt-40 md:justify-normal">
      <div className="p-12 transition-all duration-2000 md:max-w-96 md:hover:shadow-5xl">
        <div className="mb-8">
          <span className="text-nowrap text-3xl">something went wrong</span>
        </div>
        <Link
          className="text-base font-bold text-rich-black-fogra29/80 underline"
          to="/"
        >
          come back
        </Link>
      </div>
    </div>
  );
}
