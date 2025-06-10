"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type ImageCarouselProps = {
  images: { src: string; alt: string }[];
  width?: number;
  height?: number;
  autoSwitchInterval?: number; // in ms
};

export default function ImageCarousel({
  images,
  width = 300,
  height = 400,
  autoSwitchInterval = 5000,
}: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  //   const next = () => {
  //     setFade(false);
  //     setTimeout(() => {
  //       setIndex((prev) => (prev + 1) % images.length);
  //       setFade(true);
  //     }, 150); // short fade-out before switching
  //   };

  //   const prev = () => {
  //     setFade(false);
  //     setTimeout(() => {
  //       setIndex((prev) => (prev - 1 + images.length) % images.length);
  //       setFade(true);
  //     }, 150);
  //   };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, autoSwitchInterval);
    return () => clearInterval(interval);
  }, [images.length, autoSwitchInterval]);

  return (
    <div
      className="relative shadow-glow overflow-hidden rounded-2xl"
      style={{ width, height }}
    >
      <Image
        src={images[index].src}
        alt={images[index].alt}
        width={width}
        height={height}
        className={`object-cover w-full h-full transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-4">
        {images.map((_, i) => (
          <button
            key={i}
            className={`w-2.5 h-2.5 rounded-full ${
              i === index ? "bg-blue-500" : "bg-gray-400/40"
            }`}
            onClick={() => {
              setFade(false);
              setTimeout(() => {
                setIndex(i);
                setFade(true);
              }, 150);
            }}
            aria-label={`Switch to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
