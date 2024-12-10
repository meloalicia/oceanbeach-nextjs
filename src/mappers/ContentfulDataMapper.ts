import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { Entry } from "contentful";
import { ContentModelNames } from "../constants/contentful";
import { ContentfulImage } from "../types/contentful";

export class ContentfulDataMapper {
  private readonly componentData: Entry;

  constructor(componentData: Entry) {
    this.componentData = componentData;
    console.log("Dados do Contentful:", this.componentData); // Verificar os dados que estamos recebendo
  }

  public mapContentfulData() {
    const { sys } = this.componentData;
    const componentType = sys.contentType.sys.id;

    switch (componentType) {
      case ContentModelNames.HeroBanner:
        return this.mapHeroBannerData();
      case ContentModelNames.Carousel:
        return this.mapCarouselComponent();
      case ContentModelNames.CountryBeachCards:
        return this.mapCountryBeachCards();
      default:
        console.warn(`Componente desconhecido: ${componentType}`);
        return null;
    }
  }

  private mapHeroBannerData() {
    const { fields } = this.componentData;
    const { welcomeTitle, informativeText, backgroundImage } = fields;

    const imageFields = (backgroundImage as Record<string, unknown>)?.fields as ContentfulImage;
    const image = {
      url: imageFields.file.url,
      altText: imageFields.description,
      title: imageFields.title,
    };

    return {
      welcomeTitle: documentToReactComponents(welcomeTitle as Document),
      informativeText: documentToReactComponents(informativeText as Document),
      image,
    };
  }

  private mapCarouselComponent() {
    const { fields } = this.componentData;
    const { carouselTextInformation, carouselImages } = fields as {
      carouselTextInformation: Document;
      carouselImages?: Array<{
        fields: { file: { url: string }; title: string; description: string };
      }>;
    };

    if (!carouselImages || !Array.isArray(carouselImages)) {
      console.warn("carouselImage está indefinido ou não é um array.");
      return {
        carouselTextInformation: documentToReactComponents(carouselTextInformation),
        images: [],
      };
    }

    const images = carouselImages.map((image) => ({
      title: image.fields.title,
      url: image.fields.file.url,
      description: image.fields.description,
    }));

    return {
      carouselTextInformation: documentToReactComponents(carouselTextInformation),
      images,
    };
  }

  private mapCountryBeachCards() {
    const { fields } = this.componentData;
    const { beachCardsCountryNames, beachCardsTextInformation, countryBeachCardsImages } =
      fields as {
        beachCardsCountryNames: Document;
        beachCardsTextInformation: Document;
        countryBeachCardsImages?: Array<{
          fields: { file: { url: string }; title: string; description: string };
        }>;
      };

    if (!countryBeachCardsImages || !Array.isArray(countryBeachCardsImages)) {
      return {
        beachCardsCountryNames: documentToReactComponents(beachCardsCountryNames),
        beachCardsTextInformation: documentToReactComponents(beachCardsTextInformation),
        countryBeachCardsImages: [],
      };
    }

    const images = countryBeachCardsImages.map((image) => ({
      title: image.fields.title,
      url: image.fields.file.url,
      description: image.fields.description,
    }));

    return {
      beachCardsCountryNames: documentToReactComponents(beachCardsCountryNames),
      beachCardsTextInformation: documentToReactComponents(beachCardsTextInformation),
      images,
    };
  }
}
