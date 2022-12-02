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
import { useParallax } from "~/hooks/useParallax";

export const loader: LoaderFunction = async () => {
  return json({
    dsIiAlbumArt: process.env.DSII_ALBUM_ART,
    dsIiCroppedAlbumArt: process.env.DSII_CROPPED_ALBUM_ART,
  });
};

export default function DreamSequenceIi() {
  const collageRef = React.useRef<HTMLVideoElement | null>(null);
  const { dsIiAlbumArt, dsIiCroppedAlbumArt } = useLoaderData();
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
  const yOffset = useParallax();

  React.useEffect(() => {
    if (collageRef.current) {
      collageRef.current.currentTime = (yOffset / 1000) * (100 / 60);
    }
  }, [yOffset]);

  return (
    <div className="flex flex-col items-center text-center w-full">
      <div className="mb-10 lg:mb-40 lg:mt-40">
        <div
          className={
            isImgIntersecting
              ? "animate-fade-in"
              : "animate-fade-out opacity-30"
          }
          ref={imgRef}
        >
          <div className="xs:w-[90vw] sm:w-[65vw] md:w-[50vw] lg:max-w-3xl select-none pointer-events-none aspect-9/16">
            <img
              alt="dream sequence ii album artwork"
              className="h-auto w-full"
              src={dsIiCroppedAlbumArt}
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
            <div className="w-[75vw] sm:max-w-[50vw] lg:max-w-[600px] h-auto mb-8 aspect-9/16">
              <iframe
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                frameBorder="0"
                src="https://player.vimeo.com/video/759633300"
                title="floating"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-10 lg:mb-40 lg:mt-40">
        <video
          className="w-full h-full"
          ref={collageRef}
          src="https://drive.google.com/uc?id=1GYVk3tE-Nf55LRjc6U104-w1uptn3etD"
          title="test"
        />
      </div>
      <div className="flex flex-col justify-center items-center mb-4 lg:mb-20">
        <div className="mb-2">
          <div className="mb-2">
            <p className="font-black font-questrial text-lg lg:text-xl tracking-widest">
              digital album / cassette
            </p>
          </div>
          <h3 className="font-questrial text-xl lg:text-2xl tracking-widest">
            january 2023
          </h3>
        </div>

        <Tooltip title="bandcamp">
          <a href="https://bu-re.bandcamp.com/" target="_blank">
            <FontAwesomeIcon
              className="max-w-[4rem] md:max-w-[5rem] h-auto"
              icon={faBandcamp}
            />
          </a>
        </Tooltip>
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
      break;
  }
}
