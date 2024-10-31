import * as React from 'react';
import { useIntersectionObserver, useParallax } from '~/hooks';
import { Tooltip } from '~/components';

export default function DreamSequenceIi() {
  const collageRef = React.useRef<HTMLVideoElement | null>(null);
  const imgRef = React.useRef<HTMLDivElement | null>(null);
  const videoRef = React.useRef<HTMLDivElement | null>(null);

  const intersectionOptions = {
    threshold: 0.85,
    rootMargin: '20px',
  };

  const { isIntersecting: isImgIntersecting } = useIntersectionObserver(
    imgRef,
    intersectionOptions,
  );
  const { isIntersecting: isVideoIntersecting } = useIntersectionObserver(
    videoRef,
    intersectionOptions,
  );
  const { isIntersecting: isCollageIntersecting } = useIntersectionObserver(
    collageRef,
    intersectionOptions,
  );

  const yOffset = useParallax();

  React.useEffect(() => {
    if (collageRef.current) {
      collageRef.current.currentTime = (yOffset / 1000) * (90 / 60);
    }
  }, [yOffset]);

  return (
    <div className="mt-12 flex w-full flex-col items-center text-center md:mt-4">
      <div className="flex w-full flex-col items-center">
        <div className="2xl:mt-30 relative mb-40 lg:mb-40 lg:mt-10">
          <div
            className={
              isImgIntersecting ? 'animate-fade-in' : 'animate-fade-out'
            }
            ref={imgRef}
          >
            <div className="aspect-9/16 w-[95vw] select-none transition-all duration-1000 hover:shadow-2xl md:w-[50vw] lg:max-h-[75vh] lg:w-auto">
              <img
                className="h-full w-full"
                alt="dream sequence ii album artwork"
                src="/images/cropped_dsii_artwork.jpg"
              />
            </div>
          </div>

          {/* <div className="absolute z-[-1] h-4 w-[calc(100vw-20px)] rotate-45 rounded-md bg-green-50" /> */}
        </div>

        <div className="mb-10 flex w-full flex-row justify-evenly lg:mb-32">
          <div>
            <div
              ref={videoRef}
              className={
                isVideoIntersecting ? 'animate-fade-in' : 'animate-fade-out'
              }
            >
              <div className="mb-8 aspect-9/16 h-auto w-[75vw] transition-all duration-1000 hover:shadow-2xl sm:max-w-[65vw] md:w-[50vw] lg:max-h-[65vh] lg:w-auto">
                <React.Suspense fallback={null}>
                  <video
                    className="h-full w-full"
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
                </React.Suspense>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10 flex flex-col items-center justify-center lg:mb-20">
          <div className="mb-10">
            <div className="mb-2">
              <p className="font-questrial text-lg font-black tracking-widest lg:text-xl">
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
                  className="h-auto max-w-[4.4rem] md:max-w-[5.5rem]"
                  src="/images/bandcamp_square_logo_filled.jpg"
                />
              </a>
            </Tooltip>

            <Tooltip content="loser records" placement="bottom">
              <a href="https://loserrecords.bandcamp.com/" target="_blank">
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
    </div>
  );
}
