import { Link, NavLink } from '@remix-run/react';
import * as React from 'react';

const BaseNavBar = () => {
  return (
    <>
      <div className="items-center justify-center py-8 text-center md:pb-8 md:pt-12">
        {/* header */}
        <div>
          <Link
            className="font-questrial text-4xl tracking-widest md:text-5xl"
            to="/"
          >
            bu.re_
          </Link>
        </div>

        {/* divider */}
        <div className="mt-4 h-0.5 w-1/2 rounded-r-sm bg-rich-black-fogra29" />

        {/* TODO: Come back to this */}
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

export const NavBar = React.memo(BaseNavBar);
