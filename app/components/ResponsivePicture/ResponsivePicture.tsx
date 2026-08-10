import { filterClasses } from "~/utils/filterClasses";

interface ResponsiveSource {
  media?: string;
  srcSet: string;
}

interface ResponsivePictureProps {
  sources?: ResponsiveSource[];
  fallbackSrc: string;
  alt: string;
  pictureClassName?: string;
  imgClassName?: string;
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
}

const ResponsivePicture = ({
  sources = [],
  fallbackSrc,
  alt,
  pictureClassName,
  imgClassName,
  imgProps,
}: ResponsivePictureProps) => {
  return (
    <picture className={filterClasses("block", pictureClassName)}>
      {sources.map((source, index) => (
        <source
          key={`${source.srcSet}-${index}`}
          media={source.media}
          srcSet={source.srcSet}
        />
      ))}
      <img
        {...imgProps}
        alt={alt}
        className={filterClasses("block", imgClassName)}
        src={fallbackSrc}
      />
    </picture>
  );
};

export default ResponsivePicture;
export type { ResponsivePictureProps, ResponsiveSource };
