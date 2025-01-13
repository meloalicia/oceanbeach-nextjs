import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { Entry } from "contentful";
import { ContentModelNames } from "../constants/contentful";
import { ContentfulImage } from "../types/contentful";

export class ContentfulDataMapper {
  private readonly componentData: Entry;

  constructor(componentData: Entry) {
    this.componentData = componentData;
    console.log("Dados do Contentful:", this.componentData);
  }

  public mapContentfulData() {
    const { sys } = this.componentData;
    const componentType = sys.contentType.sys.id;

    switch (componentType) {
      case ContentModelNames.HeroBanner:
        return this.mapHeroBannerData();
      case ContentModelNames.Carousel:
        return this.mapCarouselComponent();
      case ContentModelNames.CountryBeachCardsContainer:
        return this.mapCountryBeachCardsContainer();
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

  private mapCountryBeachCardsContainer() {
    const { fields } = this.componentData;
    const { cards } = fields as unknown as {
      cards: Array<{
        fields: {
          title: string;
          text: Document;
          image: {
            fields: { file: { url: string }; description: string };
          };
        };
      }>;
    };

    console.log("teste", cards);

    if (!cards || !Array.isArray(cards)) {
      console.warn("cards está ausente ou não é um array.");
      return {
        cards: [],
      };
    }

    const transformedCards = cards.map((card) => ({
      title: card.fields?.title || "Título indisponível",
      text: card.fields?.text ? documentToReactComponents(card.fields.text) : null,
      image: {
        url: card.fields?.image?.fields?.file?.url?.startsWith("//")
          ? `https:${card.fields.image.fields.file.url}`
          : card.fields?.image?.fields?.file?.url || "",
        altText: card.fields?.image?.fields?.description || "Descrição indisponível",
      },
    }));

    console.log("Dados mapeados:", transformedCards);

    return {
      cards: transformedCards,
    };
  }
}
