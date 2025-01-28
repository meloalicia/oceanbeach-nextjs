"use client";
import { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import "./EmblaCarousel.scss";
import { NextButton, PrevButton, usePrevNextButtons } from "./EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";

const TWEEN_FACTOR_BASE = 0.84;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

type EmblaCarouselImage = {
  title: string;
  url: string;
  description: string;
  image: string;
};

export type EmblaCarouselProps = {
  images: EmblaCarouselImage[];
};

export function EmblaCarousel({ images }: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [showInfo, setShowInfo] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const tweenFactor = useRef(0);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  const tweenOpacity = useCallback((emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = eventName === "scroll";

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
        const opacity = numberWithinRange(tweenValue, 0, 1).toString();
        emblaApi.slideNodes()[slideIndex].style.opacity = opacity;
      });
    });
  }, []);

  const toggleInfoView = useCallback(() => {
    setShowInfo((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenFactor(emblaApi);
    tweenOpacity(emblaApi);

    emblaApi
      .on("reInit", setTweenFactor)
      .on("reInit", tweenOpacity)
      .on("scroll", tweenOpacity)
      .on("slideFocus", tweenOpacity)
      .on("select", () => {
        const index = emblaApi.selectedScrollSnap();
        setCurrentIndex(index);
      });

    // Trigger info view after 2 seconds
    const timer = setTimeout(() => {
      setShowInfo(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [emblaApi, setTweenFactor, tweenOpacity]);

  return (
    <div className="containerEmbla">
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {images.map((image, index) => {
              const imageUrl = image.url.startsWith("//") ? `https:${image.url}` : image.url;
              return (
                <div key={index} className="embla__slide">
                  {showInfo && currentIndex === index ? (
                    <div className="embla__info">
                      <h3>{image.title}</h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: image.description,
                        }}
                      />
                      <button onClick={toggleInfoView} className="embla__info-button">
                        Voltar à imagem
                      </button>
                    </div>
                  ) : (
                    <>
                      <Image
                        className="embla__slide__img"
                        src={imageUrl}
                        alt={image.title}
                        width={800}
                        height={450}
                        priority={index === 0}
                      />
                      <button onClick={toggleInfoView} className="embla__info-button">
                        Mostrar informações
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="embla__controls">
          <div className="embla__buttons">
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>

          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={`embla__dot${index === selectedIndex ? " embla__dot--selected" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmblaCarousel;
