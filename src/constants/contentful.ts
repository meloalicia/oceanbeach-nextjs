import Carousel from "../components/Carousel";
import HeroBanner from "../components/HeroBanner";

export enum ContentModelNames {
  HeroBanner = "heroBanner",
  Carousel = "carouselComponent",
}

export const componentFactory = {
  [ContentModelNames.HeroBanner]: HeroBanner,
  [ContentModelNames.Carousel]: Carousel,
};
