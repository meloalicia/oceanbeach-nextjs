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
      case ContentModelNames.CountryBeachCardsContainer:
        return this.mapCountryBeachCardsContainer();
      default:
        console.warn(`Componente desconhecido: ${componentType}`);
        return null;
    }
  }

  private mapHeroBannerData() {
    const { fields } = this.componentData;
    const { brandName, heroTitle, heroSubtitle, backgroundImage } = fields;

    const imageFields = (backgroundImage as Record<string, unknown>)?.fields as ContentfulImage;
    const image = {
      url: imageFields.file.url,
      altText: imageFields.description,
      title: imageFields.title,
    };

    return {
      brandName: documentToReactComponents(brandName as Document),
      heroTitle: documentToReactComponents(heroTitle as Document),
      heroSubtitle: documentToReactComponents(heroSubtitle as Document),
      image,
    };
  }

  private formatDescription(description: string): string {
    const lines = description.split("\n");

    return lines
      .map((line) => {
        if (line.includes(":")) {
          const [keyword, text] = line.split(":");
          return `<strong>${keyword}:</strong>${text}`;
        }
        return line;
      })
      .join("<br /><br />");
  }

  private mapCarouselComponent() {
    const { fields } = this.componentData as {
      fields: {
        carouselTextInformation?: Document;
        carouselImages?: Array<{
          sys: { id: string };
          fields: { file: { url: string }; title?: string; description?: string };
        }>;
        countryInformation?: Document;
        buttonDiscoverCountry?: string;
        buttonShowInfo?: string;
        buttonBackToImage?: string;
      };
    };

    const {
      carouselTextInformation,
      carouselImages,
      countryInformation,
      buttonDiscoverCountry,
      buttonShowInfo,
      buttonBackToImage,
    } = fields;

    if (!carouselImages || !Array.isArray(carouselImages) || carouselImages.length === 0) {
      console.warn("carouselImages está indefinido, não é um array ou está vazio.");
      return {
        carouselTextInformation: carouselTextInformation
          ? documentToReactComponents(carouselTextInformation)
          : "",
        images: [],
        countryInformation: countryInformation ? documentToReactComponents(countryInformation) : "",
        buttonDiscoverCountry: buttonDiscoverCountry || "",
        buttonShowInfo: buttonShowInfo || "",
        buttonBackToImage: buttonBackToImage || "",
      };
    }

    const images = carouselImages.map((image) => ({
      id: image.sys.id,
      url: image.fields.file.url,
      title: image.fields.title || "",
      description: image.fields.description ? this.formatDescription(image.fields.description) : "",
    }));

    return {
      carouselTextInformation: carouselTextInformation
        ? documentToReactComponents(carouselTextInformation)
        : "",
      images,
      countryInformation: countryInformation ? documentToReactComponents(countryInformation) : "",
      buttonDiscoverCountry: buttonDiscoverCountry || "",
      buttonShowInfo: buttonShowInfo || "",
      buttonBackToImage: buttonBackToImage || "",
    };
  }

  private mapCountryBeachCardsContainer() {
    const { fields } = this.componentData as {
      fields: {
        containerTitle?: string;
        cards?: Array<{
          fields: {
            countryName: Document;
            cardsTextInformation: Document;
            cardButton: string;
            image?: {
              fields: {
                file: { url: string };
                description?: string;
              };
            };
          };
        }>;
      };
    };

    const containerTitle = fields.containerTitle || "";
    const cards = fields.cards || [];

    if (cards.length === 0) {
      console.warn("Nenhum card encontrado ou cards está ausente.");
      return {
        cards: [],
        containerTitle,
      };
    }

    const transformedCards = cards.map((card) => {
      const { countryName, cardsTextInformation, cardButton, image } = card.fields;
      const imageUrl = image?.fields?.file?.url || "";
      const transformedImageUrl = imageUrl.startsWith("//") ? `https:${imageUrl}` : imageUrl;
      const imageDescription = image?.fields?.description;

      return {
        countryName: documentToReactComponents(countryName),
        textInformation: documentToReactComponents(cardsTextInformation),
        cardButton,
        image: {
          url: transformedImageUrl,
          description: imageDescription,
        },
      };
    });

    console.log("Dados mapeados:", transformedCards, containerTitle);

    return {
      containerTitle,
      cards: transformedCards,
    };
  }
}
