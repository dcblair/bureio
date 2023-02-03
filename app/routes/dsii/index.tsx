/* eslint-disable react/jsx-no-target-blank */
import * as React from "react";
import { useCatch } from "@remix-run/react";
import useIntersectionObserver from "~/hooks/useIntersectionObserver";
import NotFound from "~/pages/NotFound";
import { Tooltip } from "~/components";

export default function DreamSequenceIi() {
  const imgRef = React.useRef<HTMLDivElement | null>(null);
  const videoRef = React.useRef<HTMLDivElement | null>(null);

  const intersectionOptions = {
    threshold: 0.85,
    rootMargin: "20px",
  };

  const { isIntersecting: isImgIntersecting } = useIntersectionObserver(
    imgRef,
    intersectionOptions
  );
  const { isIntersecting: isVideoIntersecting } = useIntersectionObserver(
    videoRef,
    intersectionOptions
  );

  return (
    <div className="flex flex-col items-center text-center w-full">
      <div className="mb-10 lg:mb-40 lg:mt-10 2xl:mt-30">
        <div
          className={
            isImgIntersecting
              ? "animate-fade-in"
              : "animate-fade-out opacity-30"
          }
          ref={imgRef}
        >
          <div className="xs:w-[95vw] sm:w-[65vw] md:w-[50vw] lg:max-h-[75vh] lg:w-auto select-none pointer-events-none aspect-9/16">
            <img
              alt="dream sequence ii album artwork"
              // className="h-auto w-full"
              width="100%"
              height="100%"
              src="/images/cropped_dsii_artwork.jpg"
            />
          </div>
        </div>
      </div>

      <div className="mb-10 lg:mb-32 flex flex-row justify-evenly w-full">
        <div>
          <div
            ref={videoRef}
            className={
              isVideoIntersecting
                ? "animate-fade-in"
                : "animate-fade-out mb-4 opacity-30"
            }
          >
            <div className="w-[75vw] sm:max-w-[65vw] md:w-[50vw] lg:max-h-[65vh] lg:w-auto h-auto mb-8 aspect-9/16">
              <video
                className="w-full h-full"
                controls
                controlsList="nodownload noplaybackrate"
                poster="/images/floating_still3.png"
                title="floating"
              >
                <source
                  src="/videos/floating_vertical_5.mp4"
                  type="video/mp4"
                />
                <p>no browser support.</p>
              </video>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mb-10 lg:mb-20">
        <div className="mb-10">
          <div className="mb-2">
            <p className="font-black font-questrial text-lg lg:text-xl tracking-widest">
              digital album / cassette
            </p>
          </div>
          <div className="mb-7">
            <h3 className="font-questrial text-xl tracking-wider">
              february 10
            </h3>
          </div>
          <h4 className="font-questrial text-xl tracking-[0.5rem]">
            available:
          </h4>
        </div>

        <div className="flex space-x-8">
          <Tooltip content="bandcamp" placement="bottom">
            <a
              href="https://bu-re.bandcamp.com/album/dream-sequence-ii"
              target="_blank"
            >
              <img
                alt="bandcamp logo"
                className="max-w-[4.4rem] md:max-w-[5.5rem] h-auto"
                src="/images/bandcamp_square_logo_filled.jpg"
              />
            </a>
          </Tooltip>

          <Tooltip content="loser records" placement="bottom">
            <a href="https://loserrecords.bandcamp.com/" target="_blank">
              <img
                alt="loser records logo"
                className="max-w-[4rem] md:max-w-[5rem] h-auto"
                src="/images/loser_logo_offwhite.jpg"
              />
            </a>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  switch (caught.status) {
    case 404:
      return <NotFound />;
    default:
      return <NotFound />;
  }
}
