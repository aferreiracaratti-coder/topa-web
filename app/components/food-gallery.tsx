"use client";

import { useState } from "react";
import type { FoodGalleryCategory } from "./food-gallery-data";

type FoodGalleryProps = {
  categories: FoodGalleryCategory[];
  name: string;
};

export function FoodGallery({ categories, name }: FoodGalleryProps) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCategory = categories[activeCategoryIndex];
  const images = activeCategory.images;
  const activeImage = images[activeIndex];

  function selectCategory(index: number) {
    setActiveCategoryIndex(index);
    setActiveIndex(0);
  }

  function showPrevious() {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % images.length);
  }

  return (
    <div className="food-gallery">
      <div className="food-gallery-categories" role="tablist" aria-label={`Categorías de ${name}`}>
        {categories.map((category, index) => (
          <button
            className={index === activeCategoryIndex ? "is-active" : undefined}
            type="button"
            role="tab"
            key={category.id}
            aria-selected={index === activeCategoryIndex}
            onClick={() => selectCategory(index)}
          >
            {category.label}
          </button>
        ))}
      </div>
      <div className="food-gallery-main">
        <img src={activeImage.src} alt={activeImage.alt} width="2048" height="2048" />
        <span className="food-gallery-count" aria-live="polite">{activeIndex + 1} / {images.length}</span>
        {images.length > 1 && (
          <div className="food-gallery-controls">
            <button type="button" onClick={showPrevious} aria-label={`Ver foto anterior de ${name}`}>&larr;</button>
            <button type="button" onClick={showNext} aria-label={`Ver foto siguiente de ${name}`}>&rarr;</button>
          </div>
        )}
      </div>
      <div className="food-gallery-thumbnails" aria-label={`Galería de ${name}`}>
        {images.map((image, index) => (
          <button
            className={index === activeIndex ? "is-active" : undefined}
            type="button"
            key={image.src}
            onClick={() => setActiveIndex(index)}
            aria-label={`Ver foto ${index + 1} de ${activeCategory.label}`}
            aria-pressed={index === activeIndex}
          >
            <img src={image.src} alt="" width="180" height="136" />
          </button>
        ))}
      </div>
    </div>
  );
}
