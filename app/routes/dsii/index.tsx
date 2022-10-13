import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async () => {
  return json({
    dsIiAlbumArt: process.env.DSII_ALBUM_ART,
    floatingStill: process.env.FLOATING_STILL,
    floatingVideoUrl: process.env.FLOATING_VIDEO_URL,
  });
};

export default function DreamSequenceIi() {
  const { floatingStill, dsIiAlbumArt, floatingVideoUrl } = useLoaderData();

  return (
    // bg color - 242 239 232 - #f2efe8
    // For dark theme? 2f363b - 47 54 59
    <div className="flex flex-col items-center w-full mt-32">
      <div className="mb-48">
        <img
          alt="dream sequence ii album artwork"
          className="select-none pointer-events-none"
          src={dsIiAlbumArt}
          width="1280"
        />
      </div>
      <div className="flex flex-row justify-evenly w-full mb-8">
        <div className="mb-30 text-center">
          <div className="mb-4">
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
          <p>floating</p>
        </div>
      </div>
      <div className="mb-12">
        <h3 className="font-bold tracking-widest text-2xl">
          release: 1.20.2023
        </h3>
      </div>
    </div>
  );
}
