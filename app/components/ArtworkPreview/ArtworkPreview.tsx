import ResponsivePicture from "../ResponsivePicture/ResponsivePicture";
import type { ResponsiveSource } from "../ResponsivePicture/ResponsivePicture";
import type { Ref } from "react";
import { filterClasses } from "~/utils/filterClasses";

const DEFAULT_SOURCES: ResponsiveSource[] = [
  {
    media: "(max-width: 720px)",
    srcSet:
      "/images/webp/cropped-dsii-artwork-325w.webp 360w, /images/webp/cropped-dsii-artwork-420w.webp 1440w",
  },
  {
    media: "(min-width: 721px)",
    srcSet: "/images/webp/cropped-dsii-artwork-420w.webp 1440w",
  },
];

const DEFAULT_FALLBACK_SRC = "/images/webp/cropped-dsii-artwork-420w.webp";
const DEFAULT_ALT = "dream sequence ii album artwork";
const DEFAULT_IMAGE_CLASS_NAME =
  "lg:w-325px aspect-9/16 w-[calc(100vw-5rem)] min-w-77.5 sm:h-auto sm:w-81.25";

interface ArtworkPreviewProps {
  imgRef?: Ref<HTMLDivElement>;
  imgIntersectionRatio: number;
  setOpacityRange: (ratio: number) => number;
  handleOpenModal: () => void;
  hasOpacityChange?: boolean;
  sources?: ResponsiveSource[];
  fallbackSrc?: string;
  alt?: string;
  imageClassName?: string;
  buttonClassName?: string;
  containerClassName?: string;
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
}

const ArtworkPreview = ({
  imgIntersectionRatio,
  setOpacityRange,
  handleOpenModal,
  hasOpacityChange = true,
  imgRef,
  sources = DEFAULT_SOURCES,
  fallbackSrc = DEFAULT_FALLBACK_SRC,
  alt = DEFAULT_ALT,
  imageClassName,
  buttonClassName,
  containerClassName,
  imgProps,
}: ArtworkPreviewProps) => {
  return (
    <div
      className={filterClasses(
        "md:hover:shadow-5xl mb-4 size-fit transition-all duration-2000",
        containerClassName,
      )}
      ref={imgRef}
      style={{
        opacity: hasOpacityChange ? setOpacityRange(imgIntersectionRatio) : 1,
      }}
    >
      <button
        className={filterClasses(
          "focus:outline-black-fogra29 size-full cursor-pointer border-0 bg-transparent p-0 align-top leading-none focus:outline-2 focus:outline-offset-2",
          buttonClassName,
        )}
        onClick={handleOpenModal}
      >
        <ResponsivePicture
          sources={sources}
          fallbackSrc={fallbackSrc}
          alt={alt}
          imgClassName={imageClassName ?? DEFAULT_IMAGE_CLASS_NAME}
          imgProps={imgProps}
        />
      </button>
    </div>
  );
};

export default ArtworkPreview;
