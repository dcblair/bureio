import * as React from 'react';
import { LinksFunction } from '@remix-run/node';
import { useIntersectionObserver } from '~/hooks';
import { Tooltip } from '~/components';

export const links: LinksFunction = () => [
  { rel: 'preload', as: 'image', href: '/images/cropped_dsii_artwork.jpg' },
  { rel: 'preload', as: 'video', href: '/videos/floating_vertical_5.mp4' },
];

export default function DreamSequenceIi() {
  const imgRef = React.useRef<HTMLDivElement | null>(null);
  const videoRef = React.useRef<HTMLDivElement | null>(null);

  const intersectionOptions = {
    threshold: 1.0,
    rootMargin: '10px',
  };

  const {
    // hasAnimated: hasImgAnimated,
    intersectionRatio: imgIntersectionRatio,
  } = useIntersectionObserver(imgRef, intersectionOptions);
  const {
    // hasAnimated: hasVideoAnimated,
    intersectionRatio: videoIntersectionRatio,
  } = useIntersectionObserver(videoRef, intersectionOptions);

  const setOpacityRange = (value: string | number) =>
    Math.max(0.25, Number(value));

  return (
    <div className="flex w-full flex-col items-center text-center">
      <div className="mb-4 flex items-center justify-center lg:mb-8 lg:mt-10">
        <div
          className="aspect-9/16 w-[calc(100%-50px)] select-none transition-all duration-2000 md:h-auto md:min-h-[578px] md:w-[325px] md:hover:shadow-5xl"
          ref={imgRef}
          style={{ opacity: setOpacityRange(imgIntersectionRatio) }}
        >
          <React.Suspense
            fallback={<div className="size-full object-cover"></div>}
          >
            <img
              alt="dream sequence ii album artwork"
              className="size-full object-cover"
              src="/images/cropped_dsii_artwork.jpg"
              loading="lazy"
            />
          </React.Suspense>
        </div>
      </div>

      <div className="relative mx-auto mb-6 w-full lg:mb-20">
        <div
          className="mx-auto mb-2 aspect-9/16 h-[calc(100%-50px)] w-[calc(100%-50px)] bg-romance p-10 transition-all duration-2000 md:mb-8 md:min-h-[578px] md:w-[325px] md:hover:shadow-5xl"
          ref={videoRef}
          style={{ opacity: setOpacityRange(videoIntersectionRatio) }}
        >
          <React.Suspense fallback={null}>
            <video
              className="my-2 h-full w-full object-cover"
              controls
              controlsList="nodownload noplaybackrate"
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

      {/* divider */}

      {/* footer */}
      <div className="relative mb-6 flex flex-col items-center justify-center bg-transparent lg:mb-20">
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
