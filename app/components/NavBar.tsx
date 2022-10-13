import { NavLink } from "@remix-run/react";
import * as React from "react";

const NavBar = () => {
  const [isScroll, setIsScroll] = React.useState();

  return (
    <>
      <div className="text-center py-8 bg-gradient-to-l from-white to-romance">
        {!isScroll && (
          <div className="">
            <h1 className="text-2xl tracking-widest font-bold">bu.re_</h1>
          </div>
        )}
        <div className="fixed mt-4 w-full h-12 bg-white">
          <div className="flex items-center justify-evenly h-full py-4">
            <NavLink to="#">home</NavLink>
            <p>|</p>
            <NavLink to="#">music</NavLink>
            <p>|</p>
            <NavLink to="#">contact</NavLink>
          </div>
          <div className="bg-dark-cyan h-0.5 w-full" />
        </div>
      </div>
    </>
  );
};

export default React.memo(NavBar);
