import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async () => {
  return json({
    dsIiAlbumArt: process.env.DSII_ALBUM_ART,
    floatingStill: process.env.FLOATING_STILL,
    floatingUrl: process.env.FLOATING_URL,
  });
};

export default function DreamSequenceIi() {
  const { floatingStill, floatingUrl, dsIiAlbumArt } = useLoaderData();

  return (
    // bg color - 242 239 232 - #f2efe8
    // For dark theme? 2f363b - 47 54 59
    <div className="flex flex-col items-center w-full bg-[#f2efe8]">
      <svg />
      {/* <div className="w-full text-left">
        <h1 className="m-10 font-bold text-2xl text-dark-cyan">bu.re_</h1>
      </div> */}
      <div className="mb-96">
        <div className="mb-8">
          <img
            alt="dream sequence ii album artwork"
            src={dsIiAlbumArt}
            width="1280"
          />
        </div>
        <h3 className="font-bold tracking-widest text-2xl">
          release: 1.20.2023
        </h3>
      </div>
      <div className="mb-8">
        <video controls width="1280" height="720" poster={floatingStill}>
          <source src={floatingUrl} />
        </video>
      </div>
    </div>
  );
}
