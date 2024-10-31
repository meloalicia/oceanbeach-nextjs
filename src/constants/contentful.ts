import Carousel from "../components/Caurosel";
import HeroBanner from "../components/HeroBanner";

export enum ContentModelNames {
  HeroBanner = "heroBanner",
  Carousel = "carouselComponent",
}

export const componentFactory = {
  [ContentModelNames.HeroBanner]: HeroBanner,
  [ContentModelNames.Carousel]: Carousel,
};
