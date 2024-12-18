import React, { Suspense, useRef, useState } from "react";
import { LinksFunction } from "@remix-run/node";
import { useIntersectionObserver } from "~/hooks";
import { Overlay, Tooltip } from "~/components";

export const links: LinksFunction = () => [
  { rel: "preload", as: "image", href: "/images/cropped_dsii_artwork.jpg" },
];

export default function DreamSequenceIi() {
  const imgRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLDivElement | null>(null);
  const [searchParams, setSearchParams] = useState<URLSearchParams>();

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
    <main className="flex w-full flex-col items-center text-center">
      {/* image */}
      <div
        className="mb-4 aspect-9/16 size-fit select-none transition-all duration-2000 md:hover:shadow-5xl lg:mb-8 lg:mt-10"
        ref={imgRef}
        style={{ opacity: setOpacityRange(imgIntersectionRatio) }}
      >
        {/* <Suspense fallback={<div className="size-full object-cover" />}> */}
        <button
          className="size-full focus:outline-2 focus:outline-offset-2 focus:outline-rich-black-fogra29"
          onClick={handleOpenModal}
        >
          <picture>
            <source
              media="(max-width: 720px)"
              srcSet="/images/webp/cropped-dsii-artwork-325w.webp 360w, /images/webp/cropped-dsii-artwork-420w.webp 1440w"
            />
            <img
              alt="dream sequence ii album artwork"
              className="h-[calc(100vh-200px)] w-auto md:max-h-[578px] md:max-w-[325px]"
              src="/images/webp/cropped-dsii-artwork-420w.webp"
            />
          </picture>
        </button>
        {/* </Suspense> */}
      </div>

      {/* modal overlay */}
      <Overlay isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="relative flex items-center">
          <button
            className="focus-visible:outline-offset-8 focus-visible:outline-white"
            onClick={handleCloseModal}
          >
            <picture>
              <source
                media="(max-width: 720px)"
                srcSet="/images/webp/cropped-dsii-artwork-280w.webp 360w, /images/webp/cropped-dsii-artwork-720w.webp 720w, /images/webp/cropped-dsii-artwork-1440w.webp 1440w"
              />
              <img
                alt="dream sequence ii album artwork"
                className="aspect-9/16 max-h-[calc(100vh-60px)] w-[calc(100vw-20px)] cursor-auto object-cover md:max-h-[calc(100vh-80px)] md:w-auto"
                src="/images/webp/cropped-dsii-artwork-1440w.webp"
                fetchPriority="high"
              />
            </picture>
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

      {/* video */}
      <div
        className="mb-6 flex items-center text-center transition-all duration-2000 md:mb-8 md:h-[578px] md:w-[325px] md:hover:shadow-5xl lg:mb-20"
        ref={videoRef}
        style={{ opacity: setOpacityRange(videoIntersectionRatio) }}
      >
        <Suspense fallback={null}>
          <video
            className="aspect-9/16 h-[calc(100vh-200px)] w-auto bg-romance object-cover p-8 focus:outline-2 focus:outline-offset-4 focus:outline-rich-black-fogra29 md:max-h-[578px] md:max-w-[325px]"
            controls
            controlsList="nodownload noplaybackrate"
            preload="auto"
            poster="/images/floating_still_3.png"
            title="floating"
          >
            <source src="/videos/floating_vertical_5.mp4" type="video/mp4" />
            <p>no browser support.</p>
          </video>
        </Suspense>
      </div>

      <div className="relative mb-6 flex w-full flex-col items-center justify-center lg:mb-20">
        {/* right-positioned divider */}
        <div className="absolute -top-3 right-0 h-0.5 w-1/2 rounded-l-sm rounded-r-sm bg-gradient-to-l from-rich-black-fogra29 to-rich-black-fogra29/40 md:-top-8" />

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
                loading="lazy"
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
                loading="lazy"
                src="/images/loser_logo_offwhite.jpg"
              />
            </a>
          </Tooltip>
        </div>
      </div>
    </main>
  );
}
