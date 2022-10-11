import { NavLink } from "@remix-run/react";
import * as React from "react";

const NavBar = () => {
  return (
    <div>
      <NavLink to="#">bu.re_</NavLink>
      <NavLink to="#">music</NavLink>
      <NavLink to="#">contact</NavLink>
    </div>
  );
};

export default React.memo(NavBar);
