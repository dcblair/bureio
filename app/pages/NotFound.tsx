import { Link } from "@remix-run/react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="mb-10">
        <iframe
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="w-full h-full aspect-9/16"
          frameBorder="0"
          src="https://player.vimeo.com/video/759633300"
          title="floating"
        />
      </div>
      <div className="mb-8">
        <Link to="/">come back</Link>
      </div>
    </div>
  );
}
