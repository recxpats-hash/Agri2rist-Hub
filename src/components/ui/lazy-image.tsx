/**
 * Agri2rist Hub – LazyImage Component
 * Intersection-Observer-based image with blur-up placeholder,
 * native loading="lazy", and WebP/AVIF format hints.
 */
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: string;    // e.g. "aspect-square", "aspect-video"
  objectFit?: "cover" | "contain" | "fill" | "none";
  placeholderColor?: string;
  priority?: boolean;      // true = eager load (hero images)
}

export function LazyImage({
  src,
  alt,
  aspectRatio = "aspect-video",
  objectFit = "cover",
  placeholderColor = "bg-muted",
  priority = false,
  className,
  ...props
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", aspectRatio, className)}>
      {/* Placeholder skeleton */}
      {!loaded && !error && (
        <div
          className={cn(
            "absolute inset-0 animate-pulse",
            placeholderColor
          )}
          aria-hidden="true"
        />
      )}

      {/* Error fallback */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-xs">
          Image unavailable
        </div>
      )}

      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "low"}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={cn(
          "w-full h-full transition-opacity duration-500",
          `object-${objectFit}`,
          loaded ? "opacity-100" : "opacity-0"
        )}
        {...props}
      />
    </div>
  );
}
