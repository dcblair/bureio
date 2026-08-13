import React, { memo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, Button } from "~/components";

const BaseHeader = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  // todo: test intersection with animation
  // const { hasAnimated, isIntersecting } = useIntersectionObserver(ref);

  return (
    <header className="mb-8 md:mb-10">
      <nav className="relative mt-3 flex flex-col items-center justify-center pt-1 pb-3 text-center md:mt-12">
        <div className="relative flex w-60 items-center justify-center">
          <div className="relative w-60 md:hidden">
            <h1 className="header-text-transparent bg-black-fogra29 font-questrial inline bg-clip-text text-4xl tracking-widest text-transparent">
              bu.re_
            </h1>
          </div>

          <Button
            className="group relative hidden w-60 md:block"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <div className="w-full">
              <h1 className="header-text-transparent bg-black-fogra29 font-questrial hover:bg-black-fogra29/55 inline bg-clip-text text-5xl tracking-widest text-transparent transition duration-3000 ease-in-out motion-reduce:transition-none">
                bu.re
              </h1>

              {/* underscore */}
              <div className="from-black-fogra29 to-black-fogra29/45 rounded-px absolute right-0 bottom-1.5 flex h-1 w-14 origin-right bg-linear-to-l to-70% transition-transform duration-2000 ease-in-out group-hover:scale-x-204 motion-reduce:transition-none" />
            </div>
          </Button>

          <AnimatePresence initial={false}>
            {isNavOpen && (
              <>
                <motion.div
                  className="absolute top-1/2 left-full ml-8 hidden -translate-y-1/2 md:block"
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                >
                  <div className="flex h-full w-max items-center justify-center py-2">
                    <div>
                      <span className="text-2xl font-black tracking-widest">
                        .
                      </span>
                      <Link
                        className="font-questrial hover:text-black-fogra29/40 text-base whitespace-nowrap transition duration-1500 ease-in-out"
                        to="/"
                      >
                        seasons in migration
                      </Link>
                    </div>
                    <div>
                      <span className="text-2xl font-black tracking-widest">
                        .
                      </span>
                      <Link
                        className="font-questrial hover:text-black-fogra29/40 text-base whitespace-nowrap transition duration-1500 ease-in-out"
                        to="/dsii"
                      >
                        dream sequence ii
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
        {/* divider */}
        <div
          className={
            "from-black-fogra29 to-black-fogra29/30 rounded-r-px absolute bottom-1 left-0 mt-6 h-0.5 w-1/2 bg-linear-to-r md:-bottom-4"
          }
          ref={ref}
        />
      </nav>
    </header>
  );
};

export const Header = memo(BaseHeader);
