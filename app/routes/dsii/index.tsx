import * as React from "react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useCatch, useLoaderData } from "@remix-run/react";
import useIntersectionObserver from "~/hooks/useIntersectionObserver";

export const loader: LoaderFunction = async () => {
  return json({
    dsIiAlbumArt: process.env.DSII_ALBUM_ART,
    floatingStill: process.env.FLOATING_STILL,
    floatingVideoUrl: process.env.FLOATING_VIDEO_URL,
  });
};

export default function DreamSequenceIi() {
  const { floatingStill, dsIiAlbumArt, floatingVideoUrl } = useLoaderData();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { isIntersecting, intersectionCount } = useIntersectionObserver(ref, {
    threshold: 0.5,
  });

  console.log(intersectionCount);

  return (
    // bg color - 242 239 232 - #f2efe8
    // For dark theme? 2f363b - 47 54 59
    <div className="flex flex-col items-center w-full">
      <div className="h-[90vh] md:mt-40">
        <div className={"animate-fade-in"}>
          <img
            alt="dream sequence ii album artwork"
            className="max-w-xl md:max-w-7xl h-auto select-none pointer-events-none"
            src={dsIiAlbumArt}
          />
        </div>
      </div>
      <div className="flex flex-row justify-evenly w-full mb-8">
        <div className="mb-30 text-center">
          <div
            ref={ref}
            className={isIntersecting ? "animate-fade-in" : "mb-4"}
          >
            {/* TODO: Resizing for iFrame */}
            <iframe
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="max-w-xl md:max-w-7xl h-auto"
              frameBorder="0"
              height="1080"
              src="https://player.vimeo.com/video/759633300?h=67eafd605c&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
              title="floating"
              width="720"
            />
          </div>
          <p>floating</p>
        </div>
      </div>
      <div className="mb-12">
        <h3 className="font-bold font-questrial tracking-widest text-2xl">
          release: 1.20.2023
        </h3>
      </div>
    </div>
  );
}

// TODO: Abstract Catch and Error Boundary components into their own files
export function CatchBoundary() {
  const caught = useCatch();

  switch (caught.status) {
    case 404:
      return <h1>something's not right.</h1>;
    default:
      break;
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <div className="flex flex-col">
      <Link to="/">come back</Link>
      <iframe
        src="https://player.vimeo.com/video/759633300?h=67eafd605c&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        width="720"
        height="1080"
        title="floating"
      />
    </div>
  );
}
