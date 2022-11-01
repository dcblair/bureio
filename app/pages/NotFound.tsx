import { Link } from "@remix-run/react";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <iframe
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        frameBorder="0"
        height="1080"
        src="https://player.vimeo.com/video/759633300?h=67eafd605c&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
        title="floating"
        width="720"
      />
      <Link to="/">come back</Link>
    </div>
  );
}
