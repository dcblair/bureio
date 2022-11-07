import * as React from "react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useCatch, useLoaderData } from "@remix-run/react";
import useIntersectionObserver from "~/hooks/useIntersectionObserver";
import NotFound from "~/pages/NotFound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBandcamp } from "@fortawesome/free-brands-svg-icons";
import Tooltip from "~/components/Tooltip";

export const loader: LoaderFunction = async () => {
  return json({
    dsIiAlbumArt: process.env.DSII_ALBUM_ART,
    dsIiCroppedAlbumArt: process.env.DSII_CROPPED_ALBUM_ART,
  });
};

export default function DreamSequenceIi() {
  const { dsIiAlbumArt, dsIiCroppedAlbumArt } = useLoaderData();
  const imgRef = React.useRef<HTMLDivElement | null>(null);
  const videoRef = React.useRef<HTMLDivElement | null>(null);
  const {
    isIntersecting: isImgIntersecting,
    intersectionCount: imgIntersectionCount,
  } = useIntersectionObserver(imgRef, {
    threshold: 0.85,
    rootMargin: "20px",
  });
  const {
    isIntersecting: isVideoIntersecting,
    intersectionCount: videoIntersectionCount,
  } = useIntersectionObserver(videoRef, {
    threshold: 0.85,
    rootMargin: "20px",
  });

  console.log(imgIntersectionCount, videoIntersectionCount);

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
              src={dsIiCroppedAlbumArt}
            />
          </div>
        </div>
      </div>
      <div className="mb-48 flex flex-row justify-evenly w-full mb-8">
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
          <p>floating</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mb-20">
        <h3 className="font-bold font-questrial tracking-widest text-2xl">
          release: 1.20.2023
        </h3>
        <div className="mb-2">
          <p className="text-xl font-zen-kaku-gothic">preorder</p>
        </div>

        <Tooltip title="bandcamp">
          <Link to="https://bu-re.bandcamp.com/">
            <FontAwesomeIcon
              className="max-w-[60px] h-auto"
              icon={faBandcamp}
            />
          </Link>
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

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <NotFound />;
}
