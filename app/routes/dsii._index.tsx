import * as React from "react";
import { LinksFunction } from "@remix-run/node";
import { useIntersectionObserver } from "~/hooks";
import { Overlay, Tooltip } from "~/components";

export const links: LinksFunction = () => [
  { rel: "preload", as: "image", href: "/images/cropped_dsii_artwork.jpg" },
];

export default function DreamSequenceIi() {
  const imgRef = React.useRef<HTMLDivElement | null>(null);
  const videoRef = React.useRef<HTMLDivElement | null>(null);
  const [searchParams, setSearchParams] = React.useState<URLSearchParams>();

  const intersectionOptions = {
    threshold: 1.0,
    rootMargin: "10px",
  };

  const {
    // hasAnimated: hasImgAnimated,
    intersectionRatio: imgIntersectionRatio,
  } = useIntersectionObserver(imgRef, intersectionOptions);
  const {
    // hasAnimated: hasVideoAnimated,
    intersectionRatio: videoIntersectionRatio,
  } = useIntersectionObserver(videoRef, intersectionOptions);

  const isModalOpen = searchParams?.get("modal") === "true";

  const handleOpenModal = () => {
    setSearchParams(new URLSearchParams({ modal: "true" }));
  };

  const handleCloseModal = () => {
    setSearchParams(new URLSearchParams({ modal: "false" }));
  };

  const setOpacityRange = (value: string | number) =>
    Math.max(0.25, Number(value));

  return (
    <div className="flex w-full flex-col items-center text-center">
      {/* image */}
      <div className="mb-4 flex items-center justify-center lg:mb-8 lg:mt-10">
        <div
          className="aspect-9/16 w-3/4 select-none transition-all duration-2000 md:h-auto md:min-h-[578px] md:w-[325px] md:hover:shadow-5xl"
          ref={imgRef}
          style={{ opacity: setOpacityRange(imgIntersectionRatio) }}
        >
          <React.Suspense fallback={<div className="size-full object-cover" />}>
            <button
              className="size-full focus:outline-2 focus:outline-offset-2 focus:outline-rich-black-fogra29"
              onClick={handleOpenModal}
            >
              <img
                alt="dream sequence ii album artwork"
                className="size-full object-cover"
                src="/images/cropped_dsii_artwork.jpg"
                loading="lazy"
              />
            </button>
          </React.Suspense>
        </div>
      </div>

      {/* modal overlay */}
      <Overlay isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="relative flex items-center">
          <button
            className="focus-visible:outline-offset-8 focus-visible:outline-white"
            onClick={handleCloseModal}
          >
            <img
              alt="dream sequence ii album artwork"
              className="aspect-9/16 max-h-[calc(100vh-60px)] w-auto cursor-auto object-cover md:max-h-[calc(100vh-50px)]"
              src="/images/cropped_dsii_artwork.jpg"
            />
          </button>
          <button
            className="absolute -right-8 top-0 hidden items-center justify-center rounded-full focus-visible:outline-offset-2 focus-visible:outline-white md:-right-20 md:flex"
            onClick={handleCloseModal}
          >
            <svg
              aria-label="close modal"
              className="rounded-full fill-romance md:size-16"
              viewBox="1 0 22 22"
            >
              <path d="M7.757 6.343a0.5 0.5 0 01.707 0L12 9.879l3.536-3.536a0.5 0.5 0 11.707.707L12.707 10.586l3.536 3.536a0.5 0.5 0 01-.707.707L12 11.293l-3.536 3.536a0.5 0.5 0 01-.707-.707L11.293 10.586 7.757 7.05a0.5 0.5 0 010-.707z" />
            </svg>
          </button>
        </div>
      </Overlay>

      <div className="relative mx-auto mb-6 w-full lg:mb-20">
        {/* video */}
        <div
          className="mx-auto mb-2 flex w-3/4 items-center transition-all duration-2000 md:mb-8 md:h-auto md:min-h-[578px] md:w-[325px] md:hover:shadow-5xl"
          ref={videoRef}
          style={{ opacity: setOpacityRange(videoIntersectionRatio) }}
        >
          <React.Suspense fallback={null}>
            <video
              className="aspect-9/16 size-full min-h-[530px] bg-romance object-cover p-8 focus:outline-2 focus:outline-offset-4 focus:outline-rich-black-fogra29"
              controls
              controlsList="nodownload noplaybackrate"
              preload="auto"
              poster="/images/floating_still_3.png"
              title="floating"
            >
              <source src="/videos/floating_vertical_5.mp4" type="video/mp4" />
              <p>no browser support.</p>
            </video>
          </React.Suspense>
        </div>

        {/* right-positioned divider */}
        <div className="absolute -bottom-2 right-0 h-0.5 w-1/2 rounded-l-sm rounded-r-sm bg-gradient-to-l from-rich-black-fogra29 to-rich-black-fogra29/40 md:-bottom-12" />
      </div>

      <div className="relative mb-6 flex flex-col items-center justify-center lg:mb-20">
        <div className="mb-6 flex flex-col items-center md:mb-10">
          {/* release info */}
          <div className="mb-2">
            <p className="font-questrial text-lg font-black tracking-widest lg:text-xl">
              digital album / cassette
            </p>
          </div>
          <div className="mb-3 md:mb-7">
            <h3 className="font-questrial text-xl tracking-wider">
              february 10
            </h3>
          </div>
          <h4 className="font-questrial text-xl tracking-[0.5rem]">
            available:
          </h4>

          {/* divider */}
          <div className="mt-4 h-0.5 w-1/2 rounded-r-sm bg-gradient-to-r from-rich-black-fogra29/40 via-rich-black-fogra29 to-rich-black-fogra29/40" />
        </div>

        <div className="flex space-x-8">
          {/* bu.re_ personal bandcamp link */}
          <Tooltip content="bandcamp" placement="bottom">
            <a
              aria-label="bu.re_ dream sequence ii bandcamp"
              href="https://bu-re.bandcamp.com/album/dream-sequence-ii"
              className="rounded-none focus:outline-2 focus:outline-offset-8 focus:outline-black"
              rel="noreferrer"
              target="_blank"
            >
              <img
                alt="bandcamp logo"
                className="h-auto max-w-[4.4rem] md:max-w-[5.5rem]"
                src="/images/bandcamp_square_logo_filled.jpg"
              />
            </a>
          </Tooltip>

          {/* loser records bandcamp link */}
          <Tooltip content="loser records" placement="bottom">
            <a
              about="bu.re_ dream sequence ii loser records bandcamp"
              className="rounded-none focus:outline-2 focus:outline-offset-8 focus:outline-black"
              href="https://loserrecords.bandcamp.com/"
              rel="noreferrer"
              target="_blank"
            >
              <img
                alt="loser records logo"
                className="h-auto max-w-[4rem] md:max-w-[5rem]"
                src="/images/loser_logo_offwhite.jpg"
              />
            </a>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
