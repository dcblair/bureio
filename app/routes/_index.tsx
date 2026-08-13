import { useRef, useState } from "react";
import type { LinksFunction } from "react-router";
import { Button, Overlay, Tooltip } from "~/components";
import ArtworkPreview from "~/components/ArtworkPreview/ArtworkPreview";
import { useIntersectionObserver } from "~/hooks";

const INTERSECTION_OPTIONS = {
  threshold: 1.0,
  rootMargin: "10px",
};

interface ArtworkPreviewItem {
  alt: string;
  fallbackSrc: string;
  imageClassName: string;
  sources: Array<{
    media: string;
    srcSet: string;
  }>;
}

const artworkPreviewItems: ArtworkPreviewItem[] = [
  {
    alt: "seasons in migration album artwork",
    fallbackSrc:
      "/images/webp/seasons-in-migration/seasons-album-artwork-1280w.webp",
    imageClassName:
      "aspect-square w-[min(88vw,30rem)] sm:w-[32rem] lg:w-[40rem]",
    sources: [
      {
        media: "(max-width: 720px)",
        srcSet:
          "/images/webp/seasons-in-migration/seasons-album-artwork-320w.webp 320w, /images/webp/seasons-in-migration/seasons-album-artwork-640w.webp 640w",
      },
      {
        media: "(max-width: 1920px)",
        srcSet:
          "/images/webp/seasons-in-migration/seasons-album-artwork-960w.webp 960w, /images/webp/seasons-in-migration/seasons-album-artwork-1920w.webp 1200w",
      },
    ],
  },
  {
    alt: "seasons in migration cassette close up",
    fallbackSrc:
      "/images/webp/seasons-in-migration/seasons-cassette-1-1280w.webp",
    imageClassName: "h-auto w-[min(88vw,30rem)] sm:w-[32rem] lg:w-[40rem]",
    sources: [
      {
        media: "(max-width: 720px)",
        srcSet:
          "/images/webp/seasons-in-migration/seasons-cassette-1-320w.webp 320w, /images/webp/seasons-in-migration/seasons-cassette-1-640w.webp 640w",
      },
      {
        media: "(max-width: 1920px)",
        srcSet:
          "/images/webp/seasons-in-migration/seasons-cassette-1-960w.webp 960w, /images/webp/seasons-in-migration/seasons-cassette-1-1920w.webp 1200w",
      },
    ],
  },
  {
    alt: "seasons in migration cassette front",
    fallbackSrc:
      "/images/webp/seasons-in-migration/seasons-cassette-2-1280w.webp",
    imageClassName: "h-auto w-[min(88vw,30rem)] sm:w-[32rem] lg:w-[40rem]",
    sources: [
      {
        media: "(max-width: 720px)",
        srcSet:
          "/images/webp/seasons-in-migration/seasons-cassette-2-320w.webp 320w, /images/webp/seasons-in-migration/seasons-cassette-2-640w.webp 640w",
      },
      {
        media: "(max-width: 1920px)",
        srcSet:
          "/images/webp/seasons-in-migration/seasons-cassette-2-960w.webp 960w, /images/webp/seasons-in-migration/seasons-cassette-2-1920w.webp 1200w",
      },
    ],
  },
  {
    alt: "seasons in migration cassette on stand",
    fallbackSrc:
      "/images/webp/seasons-in-migration/seasons-cassette-3-1280w.webp",
    imageClassName: "h-auto w-[min(88vw,30rem)] sm:w-[32rem] lg:w-[40rem]",
    sources: [
      {
        media: "(max-width: 720px)",
        srcSet:
          "/images/webp/seasons-in-migration/seasons-cassette-3-320w.webp 320w, /images/webp/seasons-in-migration/seasons-cassette-3-640w.webp 640w",
      },
      {
        media: "(max-width: 1920px)",
        srcSet:
          "/images/webp/seasons-in-migration/seasons-cassette-3-960w.webp 960w, /images/webp/seasons-in-migration/seasons-cassette-3-1920w.webp 1200w",
      },
    ],
  },
  {
    alt: "seasons in migration dad hat",
    fallbackSrc: "/images/webp/seasons-in-migration/seasons-dad-hat-1280w.webp",
    imageClassName: "h-auto w-[min(88vw,30rem)] sm:w-[32rem] lg:w-[40rem]",
    sources: [
      {
        media: "(max-width: 720px)",
        srcSet:
          "/images/webp/seasons-in-migration/seasons-dad-hat-320w.webp 320w, /images/webp/seasons-in-migration/seasons-dad-hat-640w.webp 640w",
      },
      {
        media: "(max-width: 1920px)",
        srcSet:
          "/images/webp/seasons-in-migration/seasons-dad-hat-960w.webp 960w, /images/webp/seasons-in-migration/seasons-dad-hat-1920w.webp 1200w",
      },
    ],
  },
];

export const links: LinksFunction = () => [
  {
    rel: "prefetch",
    as: "image",
    href: "/images/webp/seasons-in-migration/seasons-album-artwork-1920w.webp",
  },
];

interface HomeArtworkPreviewProps {
  item: ArtworkPreviewItem;
  onOpenModal: () => void;
}

const HomeArtworkPreview = ({ item, onOpenModal }: HomeArtworkPreviewProps) => {
  const imgRef = useRef<HTMLDivElement | null>(null);
  const { intersectionRatio } = useIntersectionObserver(
    imgRef,
    INTERSECTION_OPTIONS,
  );
  const setOpacityRange = (value: string | number) =>
    Math.max(0.25, Number(value));

  return (
    <ArtworkPreview
      alt={item.alt}
      fallbackSrc={item.fallbackSrc}
      handleOpenModal={onOpenModal}
      imageClassName={item.imageClassName}
      imgIntersectionRatio={intersectionRatio}
      imgRef={imgRef}
      setOpacityRange={setOpacityRange}
      sources={item.sources}
    />
  );
};

export default function Index() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const activeImage = artworkPreviewItems[activeImageIndex];

  const handleOpenModal = (imageIndex: number) => {
    setActiveImageIndex(imageIndex);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex w-full flex-col items-center gap-6 px-6 text-center">
      {artworkPreviewItems.map((item, index) => (
        <HomeArtworkPreview
          key={item.fallbackSrc}
          item={item}
          onOpenModal={() => handleOpenModal(index)}
        />
      ))}

      <Overlay
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="seasons in migration artwork overlay"
      >
        <div className="relative flex items-center">
          <Button variant="secondary" onClick={handleCloseModal}>
            <picture>
              {activeImage.sources.map((source) => (
                <source
                  key={`${source.media}-${source.srcSet}`}
                  media={source.media}
                  srcSet={source.srcSet}
                />
              ))}
              <img
                alt={activeImage.alt}
                className="h-[calc(100dvh-60px)] max-w-[calc(100dvw-30px)] cursor-auto object-contain sm:h-[calc(100dvh-100px)] md:max-h-[calc(90dvh)] md:w-auto"
                src={activeImage.fallbackSrc}
                fetchPriority="high"
              />
            </picture>
          </Button>
        </div>
      </Overlay>

      <footer className="relative mt-8 mb-6 flex w-full flex-col items-center justify-center lg:mb-20">
        {/* right-positioned divider */}
        <div className="from-black-fogra29 to-black-fogra29/40 rounded-l-px absolute -top-3 right-0 h-0.5 w-1/2 bg-linear-to-l md:-top-8" />

        <div className="mb-4 flex flex-col items-center">
          {/* release info */}
          <div className="mb-2 flex flex-col items-center">
            <h2 className="font-questrial text-xl font-black tracking-widest">
              seasons in migration
            </h2>
            <div className="from-black-fogra29/40 via-black-fogra29 to-black-fogra29/40 rounded-px mt-4 h-0.5 w-full bg-linear-to-r" />
          </div>

          <div className="mb-2">
            <span className="font-questrial font-black tracking-widest">
              digital album / cassette
            </span>
          </div>
          <div className="mb-3 flex flex-col items-center md:mb-7">
            <span className="font-questrial text-xl tracking-wider">
              august 21
            </span>

            {/* divider */}
            <div className="from-black-fogra29/40 via-black-fogra29 to-black-fogra29/40 rounded-px mt-4 h-0.5 w-3/4 bg-linear-to-r" />
          </div>
          <span className="font-questrial text-xl tracking-[0.5rem]">
            available:
          </span>
        </div>

        <div className="flex space-x-8">
          {/* akp bandcamp link */}
          <Tooltip content="akp recordings" placement="bottom">
            <a
              about="bu.re_ seasons in migration akp recordings bandcamp"
              className="rounded-none focus:outline-2 focus:outline-offset-8 focus:outline-black"
              href="https://bu-re.bandcamp.com/album/seasons-in-migration"
              rel="noreferrer"
              target="_blank"
            >
              <img
                alt="akp recordings logo"
                className="h-auto max-w-32"
                loading="lazy"
                src="/images/webp/akp_logo.webp"
              />
            </a>
          </Tooltip>
        </div>
      </footer>
    </div>
  );
}
