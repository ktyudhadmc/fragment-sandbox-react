import { Children, useEffect, useState, type ReactNode } from "react";
import { css, cx } from "../../../styled-system/css";
import { IconButton } from "../IconButton";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";

export interface CarouselProps {
  children: ReactNode;
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
}

export function Carousel({
  children,
  autoPlay = false,
  interval = 4000,
  showArrows = true,
  showDots = true,
  className,
}: CarouselProps) {
  const slides = Children.toArray(children);
  const [index, setIndex] = useState(0);

  const goTo = (next: number) => {
    setIndex((next + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;
    const timer = setInterval(() => goTo(index + 1), interval);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, interval, index, slides.length]);

  return (
    <div
      className={cx(
        css({ position: "relative", width: "full", overflow: "hidden", rounded: "lg" }),
        className
      )}
    >
      <div
        className={css({ display: "flex", transition: "transform 0.3s ease-in-out" })}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className={css({ flex: "0 0 100%", width: "full" })}>
            {slide}
          </div>
        ))}
      </div>

      {showArrows && slides.length > 1 && (
        <>
          <IconButton
            aria-label="Previous slide"
            icon={<ChevronLeftIcon />}
            onClick={() => goTo(index - 1)}
            className={css({
              position: "absolute",
              top: "50%",
              left: "2",
              transform: "translateY(-50%)",
              bg: "white",
              boxShadow: "md",
            })}
          />
          <IconButton
            aria-label="Next slide"
            icon={<ChevronRightIcon />}
            onClick={() => goTo(index + 1)}
            className={css({
              position: "absolute",
              top: "50%",
              right: "2",
              transform: "translateY(-50%)",
              bg: "white",
              boxShadow: "md",
            })}
          />
        </>
      )}

      {showDots && slides.length > 1 && (
        <div
          className={css({
            position: "absolute",
            bottom: "3",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "1.5",
          })}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
              className={css({
                w: "2",
                h: "2",
                rounded: "full",
                cursor: "pointer",
                bg: "white",
                opacity: i === index ? 1 : 0.5,
                boxShadow: "sm",
              })}
            />
          ))}
        </div>
      )}
    </div>
  );
}

Carousel.displayName = "Carousel";
