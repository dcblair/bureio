import { NavLink } from '@remix-run/react';
import { Link } from '~/components';
import * as React from 'react';
import { useIntersectionObserver } from '~/hooks';

const BaseHeader = () => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  // todo: test intersection with animation
  // const { hasAnimated, isIntersecting } = useIntersectionObserver(ref);

  return (
    <div className="relative mt-3 flex flex-col items-center justify-center pb-3 pt-1 text-center md:mt-12">
      {/* header */}
      <Link to="/">
        <h1 className="bg-gradient-to-r from-rich-black-fogra29 to-rich-black-fogra29/75 bg-clip-text font-questrial text-4xl tracking-widest text-transparent md:text-5xl">
          bu.re_
        </h1>
      </Link>

      {/* divider */}
      <div
        className={
          'absolute bottom-1 left-0 mt-6 h-0.5 w-1/2 rounded-r-sm bg-gradient-to-r from-rich-black-fogra29 to-rich-black-fogra29/30 md:-bottom-3'
        }
        ref={ref}
      />

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
  );
};

export const Header = React.memo(BaseHeader);
