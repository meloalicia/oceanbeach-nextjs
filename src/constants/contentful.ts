import CountryBeachCards from "@/components/CountryBeachCards";
import Carousel from "../components/Carousel";
import HeroBanner from "../components/HeroBanner";

export enum ContentModelNames {
  HeroBanner = "heroBanner",
  Carousel = "carouselComponent",
  CountryBeachCards = "countryBeachCards",
}

export const componentFactory = {
  [ContentModelNames.HeroBanner]: HeroBanner,
  [ContentModelNames.Carousel]: Carousel,
  [ContentModelNames.CountryBeachCards]: CountryBeachCards,
};
