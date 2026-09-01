"use client";

import { useState } from "react";

type GalleryImage = {
  src: string;
  alt: string;
};

type RentalGalleryProps = {
  name: string;
  images: GalleryImage[];
};

export function RentalGallery({ name, images }: RentalGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  function showPrevious() {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % images.length);
  }

  return (
    <div className="rental-gallery">
      <div className="rental-gallery-main">
        <img src={activeImage.src} alt={activeImage.alt} width="1206" height="1458" />
        {images.length > 1 && (
          <>
            <span className="rental-gallery-count" aria-live="polite">
              {activeIndex + 1} / {images.length}
            </span>
            <div className="rental-gallery-controls">
              <button type="button" onClick={showPrevious} aria-label={`Ver foto anterior de ${name}`}>&larr;</button>
              <button type="button" onClick={showNext} aria-label={`Ver foto siguiente de ${name}`}>&rarr;</button>
            </div>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="rental-gallery-thumbnails" aria-label={`Galería de ${name}`}>
          {images.map((image, index) => (
            <button
              className={index === activeIndex ? "is-active" : undefined}
              type="button"
              key={image.src}
              onClick={() => setActiveIndex(index)}
              aria-label={`Ver foto ${index + 1} de ${name}`}
              aria-pressed={index === activeIndex}
            >
              <img src={image.src} alt="" width="160" height="120" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
