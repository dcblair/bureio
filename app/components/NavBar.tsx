import { Link, NavLink } from "@remix-run/react";
import * as React from "react";

const NavBar = () => {
  const [isScroll, setIsScroll] = React.useState(false);

  return (
    <>
      <div className="text-center items-center justify-center py-4 md:py-12 bg-gradient-to-r from-romance via-ghost-white to-romance">
        {!isScroll && (
          <div className="mt-4">
            <Link
              className="text-2xl md:text-3xl lg:text-4xl font-questrial tracking-widest font-bold"
              to="/"
            >
              bu.re_
            </Link>
          </div>
        )}
        {/* TODO: Come back to this when  */}
        {/* <div className="fixed mt-4 w-full h-12 bg-white">
          <div className="flex items-center justify-evenly h-full py-4">
            <NavLink to="#">home</NavLink>
            <p>|</p>
            <NavLink to="#">music</NavLink>
            <p>|</p>
            <NavLink to="#">contact</NavLink>
          </div>
          <div className="bg-dark-cyan h-0.5 w-full" />
        </div> */}
      </div>
    </>
  );
};

export default React.memo(NavBar);
