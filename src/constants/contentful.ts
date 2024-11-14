import Carousel from "../components/Caurosel";
import { EmblaCarousel } from "../components/EmblaCarousel";
import HeroBanner from "../components/HeroBanner";

export enum ContentModelNames {
  HeroBanner = "heroBanner",
  Carousel = "carouselComponent",
  EmblaCarousel = "EmblaCarousel",
}

export const componentFactory = {
  [ContentModelNames.HeroBanner]: HeroBanner,
  [ContentModelNames.Carousel]: Carousel,
  [ContentModelNames.EmblaCarousel]: EmblaCarousel,
};
