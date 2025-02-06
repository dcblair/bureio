import { useRef, useState } from "react";
import { LinksFunction } from "@remix-run/node";
import { useIntersectionObserver } from "~/hooks";
import { AudioPlayer, Overlay, Tooltip } from "~/components";

export const links: LinksFunction = () => [
  {
    rel: "prefetch",
    as: "image",
    href: "/images/webp/cropped-dsii-artwork-1440w.webp",
  },
];

export default function DreamSequenceii() {
  const imgRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLDivElement | null>(null);
  const [searchParams, setSearchParams] = useState<URLSearchParams>();

  const intersectionOptions = {
    threshold: 1.0,
    rootMargin: "10px",
  };

  const { intersectionRatio: imgIntersectionRatio } = useIntersectionObserver(
    imgRef,
    intersectionOptions,
  );
  const { intersectionRatio: videoIntersectionRatio } = useIntersectionObserver(
    videoRef,
    intersectionOptions,
  );

  const isModalOpen = searchParams?.get("dsiiModal") === "true";

  const handleOpenModal = () => {
    setSearchParams(new URLSearchParams({ dsiiModal: "true" }));
  };

  const handleCloseModal = () => {
    setSearchParams(new URLSearchParams({ dsiiModal: "false" }));
  };

  const setOpacityRange = (value: string | number) =>
    Math.max(0.25, Number(value));

  return (
    <main className="flex w-full flex-col items-center text-center">
      {/* dsii album artwork image */}
      <div
        className="mb-4 size-fit select-none transition-all duration-2000 md:hover:shadow-5xl lg:my-10"
        ref={imgRef}
        style={{ opacity: setOpacityRange(imgIntersectionRatio) }}
      >
        <button
          className="size-full focus:outline-2 focus:outline-offset-2 focus:outline-rich-black-fogra29"
          onClick={handleOpenModal}
        >
          <picture>
            <source
              media="(max-width: 720px)"
              srcSet="/images/webp/cropped-dsii-artwork-325w.webp 360w, /images/webp/cropped-dsii-artwork-420w.webp 1440w"
            />
            <source
              media="(min-width: 721px)"
              srcSet="/images/webp/cropped-dsii-artwork-420w.webp 1440w"
            />
            <img
              alt="dream sequence ii album artwork"
              className="lg:w-325px aspect-9/16 w-[calc(100vw-5rem)] min-w-[310px] sm:h-auto sm:w-[325px]"
              src="/images/webp/cropped-dsii-artwork-420w.webp"
            />
          </picture>
        </button>
      </div>

      {/* dsii album artwork modal overlay */}
      <Overlay isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="relative flex items-center">
          <button
            className="focus-visible:outline-offset-8 focus-visible:outline-white"
            onClick={handleCloseModal}
          >
            <picture>
              <source
                media="(max-width: 720px)"
                srcSet="/images/webp/cropped-dsii-artwork-280w.webp 360w, /images/webp/cropped-dsii-artwork-720w.webp 720w"
              />
              <source
                media="(max-width: 1440px)"
                srcSet="/images/webp/cropped-dsii-artwork-1440w.webp 1440w"
              />
              <img
                alt="dream sequence ii album artwork"
                className="aspect-9/16 h-[calc(100dvh-70px)] max-w-[calc(100dvw-30px)] cursor-auto object-cover sm:h-[calc(100dvh-100px)] md:max-h-[calc(85dvh)] md:w-auto"
                src="/images/webp/cropped-dsii-artwork-1440w.webp"
                fetchPriority="high"
              />
            </picture>
          </button>

          {/* close icon button */}
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
        className="mb-8 size-fit select-none transition-all duration-2000 md:hover:shadow-5xl lg:mb-14"
        ref={videoRef}
        style={{ opacity: setOpacityRange(videoIntersectionRatio) }}
      >
        <video
          className="aspect-9/16 h-auto w-[calc(100vw-5rem)] min-w-[310px] bg-romance object-cover p-8 focus:outline-2 focus:outline-offset-4 focus:outline-rich-black-fogra29 sm:h-auto sm:w-[325px] lg:h-auto lg:w-[325px]"
          controls
          controlsList="nodownload noplaybackrate"
          preload="auto"
          poster="/images/webp/floating-still-3-960w.webp"
          title="floating"
        >
          <source src="/videos/floating_vertical_5.mp4" type="video/mp4" />
          <p>no browser support.</p>
        </video>
      </div>

      {/* footer */}
      {/* todo: add footer tag if this ends up being actual footer */}
      <div className="relative mb-6 flex w-full flex-col items-center justify-center lg:mb-20">
        {/* right-positioned divider */}
        <div className="absolute -top-3 right-0 h-0.5 w-1/2 rounded-l-sm rounded-r-sm bg-gradient-to-l from-rich-black-fogra29 to-rich-black-fogra29/40 md:-top-8" />

        <div className="mb-6 flex flex-col items-center md:mb-10">
          {/* release info */}
          <div className="mb-2">
            <h2 className="font-questrial text-lg font-black tracking-widest lg:text-xl">
              digital album / cassette
            </h2>
          </div>
          <div className="mb-3 md:mb-7">
            <span className="font-questrial text-xl tracking-wider">
              february 10
            </span>
          </div>
          <span className="font-questrial text-xl tracking-[0.5rem]">
            available:
          </span>

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
                src="/images/bandcamp-square-logo-filled.jpg"
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
                src="/images/webp/loser-logo-offwhite-414w.webp"
              />
            </a>
          </Tooltip>
        </div>
      </div>
      <AudioPlayer />
    </main>
  );
}
