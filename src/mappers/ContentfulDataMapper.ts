import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { Entry } from "contentful";
import { ContentModelNames } from "../constants/contentful";
import { ContentfulImage } from "../types/contentful";

// type HeroBanner = {
//   welcomeTitle: string;
//   informativeText: string;
//   backgroundImage: ContentfulImage;
// }
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

  private mapCarouselComponent() {
    const { fields } = this.componentData;
    const { carouselTextInformation, carouselImages, countryInformation } = fields as {
      carouselTextInformation: Document;
      carouselImages?: Array<{
        fields: { file: { url: string }; title?: string; description?: string };
      }>;
      countryInformation?: Document; // Adiciona countryInformation aqui
    };

    if (!carouselImages || !Array.isArray(carouselImages) || carouselImages.length === 0) {
      console.warn("carouselImages está indefinido, não é um array ou está vazio.");
      return {
        carouselTextInformation: documentToReactComponents(carouselTextInformation),
        images: [],
        countryInformation: countryInformation ? documentToReactComponents(countryInformation) : "", // Verificando se existe
      };
    }

    const images = carouselImages.map((image) => ({
      url: image.fields.file.url,
      title: image.fields.title || "",
      description: image.fields.description || "",
    }));

    return {
      carouselTextInformation: documentToReactComponents(carouselTextInformation),
      images,
      countryInformation: countryInformation ? documentToReactComponents(countryInformation) : "", // Verificando se existe
    };
  }

  private mapCountryBeachCardsContainer() {
    const { fields } = this.componentData;
    const containerTitle = fields.containerTitle || "";
    const { cards } = fields as unknown;

    if (!cards || !Array.isArray(cards) || cards.length === 0) {
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
        cardButton: cardButton,
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
