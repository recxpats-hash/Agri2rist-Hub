import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Grid3X3, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type GalleryMode = "grid" | "slideshow";

export function CategoryGalleryModal({
  categoryName,
  images,
  onClose,
}: {
  categoryName: string;
  images: string[];
  onClose: () => void;
}) {
  const [mode, setMode] = useState<GalleryMode>("grid");
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (mode === "slideshow" && images.length > 0 && slideIndex >= images.length) {
      setSlideIndex(0);
    }
  }, [mode, images.length, slideIndex]);

  if (images.length === 0) {
    return (
      <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
        <div className="bg-card rounded-lg p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-4">
            <div>
              <Badge className="bg-secondary text-secondary-foreground">Gallery</Badge>
              <h2 className="text-xl font-extrabold text-foreground mt-2">{categoryName}</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-foreground">
              <X size={18} />
            </Button>
          </div>
          <p className="text-muted-foreground text-center py-8">No images available for this category yet.</p>
        </div>
      </div>
    );
  }

  const currentImage = images[slideIndex] || images[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 md:p-8 animate-fade-in" onClick={onClose}>
      <div className="bg-card rounded-xl w-full max-w-7xl max-h-[95vh] overflow-hidden shadow-hero flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-border p-4 md:p-6">
          <div>
            <Badge className="bg-secondary text-secondary-foreground">Gallery</Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">{categoryName}</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setMode(mode === "grid" ? "slideshow" : "grid")}>
              {mode === "grid" ? (
                <>
                  <Play size={14} className="mr-1" />
                  Slideshow
                </>
              ) : (
                <>
                  <Grid3X3 size={14} className="mr-1" />
                  Grid
                </>
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-foreground">
              <X size={18} />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {mode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {images.map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-lg overflow-hidden border border-border cursor-pointer hover:border-primary transition-colors"
                  onClick={() => {
                    setSlideIndex(i);
                    setMode("slideshow");
                  }}
                >
                  <img src={src} alt={`${categoryName} ${i + 1}`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="relative w-full">
                <img src={currentImage} alt={`${categoryName} ${slideIndex + 1}`} className="w-full max-h-[70vh] object-contain rounded-lg bg-muted" />
              </div>
              <div className="flex items-center justify-center gap-4 mt-4">
                <Button variant="outline" onClick={() => setSlideIndex((prev) => (prev - 1 + images.length) % images.length)}>
                  <ChevronLeft size={18} className="mr-1" />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground min-w-[60px] text-center">
                  {slideIndex + 1} / {images.length}
                </span>
                <Button variant="outline" onClick={() => setSlideIndex((prev) => (prev + 1) % images.length)}>
                  Next
                  <ChevronRight size={18} className="ml-1" />
                </Button>
              </div>
              <div className="flex gap-2 mt-4 flex-wrap justify-center">
                {images.map((src, i) => (
                  <div
                    key={i}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden border-2 cursor-pointer transition-colors ${
                      i === slideIndex ? "border-primary" : "border-transparent"
                    }`}
                    onClick={() => setSlideIndex(i)}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
