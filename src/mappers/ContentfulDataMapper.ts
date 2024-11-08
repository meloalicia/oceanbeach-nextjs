import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { Entry } from "contentful";
import { ContentModelNames } from "../constants/contentful";
import { ContentfulImage } from "../types/contentful";

export class ContentfulDataMapper {
  private readonly componentData: Entry;

  constructor(componentData: Entry) {
    this.componentData = componentData;
  }

  public mapContentfulData() {
    const { sys } = this.componentData;
    const componentType = sys.contentType.sys.id;

    switch (componentType) {
      case ContentModelNames.HeroBanner:
        return this.mapHeroBannerData();
      case ContentModelNames.Carousel:
        return this.mapCarouselComponent();
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

    const images = carouselImages.map((images) => ({
      title: images.fields.title,
      url: images.fields.file.url,
      description: images.fields.description,
    }));

    return {
      carouselTextInformation: documentToReactComponents(carouselTextInformation),
      images,
    };
  }
}
