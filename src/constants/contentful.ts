import HeroBanner from "../components/HeroBanner";

export enum ContentModelNames {
  HeroBanner = "heroBanner",
}

export const componentFactory = {
  [ContentModelNames.HeroBanner]: HeroBanner,
};
