import { Link, NavLink } from '@remix-run/react';
import * as React from 'react';

const BaseNavBar = () => {
  const [isScroll, setIsScroll] = React.useState(false);

  return (
    <>
      <div className="items-center justify-center py-4 text-center md:py-8">
        {!isScroll && (
          <div className="mt-4">
            <Link
              className="font-questrial text-6xl tracking-widest md:text-5xl"
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

export const NavBar = React.memo(BaseNavBar);
