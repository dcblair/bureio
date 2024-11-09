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
      <Link className="group relative" to="/">
        <h1 className="bg-clip-text-safari bg-rich-black-fogra29 font-questrial text-4xl tracking-widest text-transparent transition-all duration-3000 hover:bg-rich-black-fogra29/55 md:text-5xl">
          bu.re<span className="inline md:hidden">_</span>
        </h1>

        {/* underscore */}
        <div className="rountded-sm absolute -right-10 bottom-1 hidden h-1 w-14 bg-gradient-to-l from-rich-black-fogra29 to-rich-black-fogra29/45 to-70% transition-all duration-2000 group-hover:w-32 md:flex" />
      </Link>

      {/* divider */}
      <div
        className={
          'absolute bottom-1 left-0 mt-6 h-0.5 w-1/2 rounded-r-sm bg-gradient-to-r from-rich-black-fogra29 to-rich-black-fogra29/30 md:-bottom-4'
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
