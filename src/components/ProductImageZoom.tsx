"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";

type ProductImageZoomProps = {
  src: string;
  alt: string;
  zoomLevel?: number;
  lensSize?: number;
  className?: string;
};

export function ProductImageZoom({
  src,
  alt,
  zoomLevel = 2.5,
  lensSize = 160,
  className = "",
}: ProductImageZoomProps) {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [bgSize, setBgSize] = useState({ width: 0, height: 0 });
  const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const computeLensStyle = useCallback(
    (clientX: number, clientY: number) => {
      if (!imageContainerRef.current) return;

      const rect = imageContainerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const clampedX = Math.max(0, Math.min(x, rect.width));
      const clampedY = Math.max(0, Math.min(y, rect.height));

      const bgW = rect.width * zoomLevel;
      const bgH = rect.height * zoomLevel;
      const bgX = -(clampedX * zoomLevel - lensSize / 2);
      const bgY = -(clampedY * zoomLevel - lensSize / 2);

      setLensPosition({ x: clampedX, y: clampedY });
      setBgSize({ width: bgW, height: bgH });
      setBgPosition({ x: bgX, y: bgY });
    },
    [zoomLevel, lensSize],
  );

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDesktop) return;
      setIsHovering(true);
      computeLensStyle(e.clientX, e.clientY);
    },
    [isDesktop, computeLensStyle],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDesktop) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        computeLensStyle(e.clientX, e.clientY);
      });
    },
    [isDesktop, computeLensStyle],
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-neutral-200 bg-[#F5F2ED] p-4 sm:p-6 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={imageContainerRef}
        className="relative aspect-[3/4] overflow-hidden rounded-xl"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        {isDesktop && (
          <div
            className="absolute pointer-events-none rounded-full border-2 border-white/80 shadow-2xl transition-opacity duration-200"
            style={{
              width: lensSize,
              height: lensSize,
              left: lensPosition.x - lensSize / 2,
              top: lensPosition.y - lensSize / 2,
              backgroundImage: `url(${src})`,
              backgroundSize: `${bgSize.width}px ${bgSize.height}px`,
              backgroundPosition: `${bgPosition.x}px ${bgPosition.y}px`,
              backgroundRepeat: "no-repeat",
              opacity: isHovering ? 1 : 0,
            }}
          />
        )}
      </div>
    </div>
  );
}
