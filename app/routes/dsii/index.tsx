/* eslint-disable react/jsx-no-target-blank */
import * as React from "react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import useIntersectionObserver from "~/hooks/useIntersectionObserver";
import NotFound from "~/pages/NotFound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBandcamp } from "@fortawesome/free-brands-svg-icons";
import Tooltip from "~/components/Tooltip";
import useMediaQuery from "~/hooks/useMediaQuery";

export const loader: LoaderFunction = async () => {
  return json({
    dsIiAlbumArt: process.env.DSII_ALBUM_ART,
    dsIiCroppedAlbumArt: process.env.DSII_CROPPED_ALBUM_ART,
  });
};

export default function DreamSequenceIi() {
  const { dsIiAlbumArt, dsIiCroppedAlbumArt } = useLoaderData();
  const width = useMediaQuery();
  const imgRef = React.useRef<HTMLDivElement | null>(null);
  const videoRef = React.useRef<HTMLDivElement | null>(null);
  const { isIntersecting: isImgIntersecting } = useIntersectionObserver(
    imgRef,
    {
      threshold: 0.85,
      rootMargin: "20px",
    }
  );
  const { isIntersecting: isVideoIntersecting } = useIntersectionObserver(
    videoRef,
    {
      threshold: 0.85,
      rootMargin: "20px",
    }
  );

  return (
    <div className="flex flex-col items-center text-center w-full">
      <div className="mb-40 lg:mt-40">
        {/* TODO: would it look better using the std artwork for mobile and cropped for desktop? */}
        <div
          className={
            isImgIntersecting
              ? "animate-fade-in"
              : "animate-fade-out opacity-30"
          }
          ref={imgRef}
        >
          <div className="md:max-w-3xl h-auto select-none pointer-events-none">
            <img
              alt="dream sequence ii album artwork"
              src={
                width && width < 800 && width > 500
                  ? dsIiAlbumArt
                  : dsIiCroppedAlbumArt
              }
            />
          </div>
        </div>
      </div>
      <div className="mb-30 flex flex-row justify-evenly w-full mb-8">
        <div>
          <div
            ref={videoRef}
            className={
              isVideoIntersecting
                ? "animate-fade-in"
                : "animate-fade-out mb-4 opacity-30"
            }
          >
            <div className="md:w-[500px] lg:w-[720px] h-auto mb-8">
              <iframe
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="w-full h-full aspect-9/16"
                frameBorder="0"
                src="https://player.vimeo.com/video/759633300"
                title="floating"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mb-20">
        <div className="mb-4">
          <div className="mb-2">
            <p className="font-black font-questrial text-lg md:text-2xl tracking-widest">
              digital album / cassette
            </p>
          </div>
          <h3 className="font-questrial text-xl md:text-3xl tracking-widest">
            january 2023
          </h3>
        </div>

        <Tooltip title="bandcamp">
          <a href="https://bu-re.bandcamp.com/" target="_blank">
            <FontAwesomeIcon
              className="max-w-[60px] h-auto"
              icon={faBandcamp}
            />
          </a>
        </Tooltip>
      </div>
    </div>
  );
}

// TODO: Abstract Catch and Error Boundary components into their own files
export function CatchBoundary() {
  const caught = useCatch();

  switch (caught.status) {
    case 404:
      return <NotFound />;
    default:
      break;
  }
}
