import React, { memo } from "react";
import { Link } from "~/components";

const BaseHeader = () => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  // todo: test intersection with animation
  // const { hasAnimated, isIntersecting } = useIntersectionObserver(ref);

  return (
    <header>
      <nav className="relative mt-3 flex flex-col items-center justify-center pt-1 pb-3 text-center md:mt-12">
        <Link className="group relative w-60" to="/">
          <div className="w-full">
            <h1 className="header-text-transparent bg-rich-black-fogra29 font-questrial hover:bg-rich-black-fogra29/55 inline bg-clip-text text-4xl tracking-widest text-transparent transition duration-3000 ease-in-out motion-reduce:transition-none md:text-5xl">
              bu.re<span className="inline md:hidden">_</span>
            </h1>

            {/* underscore */}
            <div className="from-rich-black-fogra29 to-rich-black-fogra29/45 absolute right-0 bottom-1.5 hidden h-1 w-14 origin-right rounded-sm bg-gradient-to-l to-70% transition-transform duration-2000 group-hover:scale-x-200 motion-reduce:transition-none md:flex" />
          </div>
        </Link>

        {/* divider */}
        <div
          className={
            "from-rich-black-fogra29 to-rich-black-fogra29/30 absolute bottom-1 left-0 mt-6 h-0.5 w-1/2 rounded-r-sm bg-gradient-to-r md:-bottom-4"
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
      </nav>
    </header>
  );
};

export const Header = memo(BaseHeader);
