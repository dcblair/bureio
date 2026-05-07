import { NavLink } from "react-router";

export default function NotFound() {
  return (
    <div className="mt-0 flex size-full flex-col items-center justify-center text-center md:mt-40 md:justify-normal">
      <div className="md:hover:shadow-5xl p-12 transition-all duration-2000 md:max-w-96">
        <div className="mb-8">
          <span className="text-3xl text-nowrap">something went wrong</span>
        </div>
        <NavLink
          className="text-black-fogra29/80 text-base font-bold underline"
          to="/"
        >
          come back
        </NavLink>
      </div>
    </div>
  );
}
