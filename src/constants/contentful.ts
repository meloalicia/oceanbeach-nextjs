import CountryBeachCardsContainer from "@/components/CountryBeachCardsContainer";
import Carousel from "../components/Carousel";
import HeroBanner from "../components/HeroBanner";

export enum ContentModelNames {
  HeroBanner = "heroBanner",
  Carousel = "carouselComponent",
  CountryBeachCardsContainer = "countryBeachCardsContainer",
}

export const componentFactory = {
  [ContentModelNames.HeroBanner]: HeroBanner,
  [ContentModelNames.Carousel]: Carousel,
  [ContentModelNames.CountryBeachCardsContainer]: CountryBeachCardsContainer,
};
