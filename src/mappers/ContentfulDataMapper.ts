import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { Entry } from "contentful";
import { title } from "process";
import { ContentModelNames } from "../constants/contentful";
import { ContentfulImage } from "../types/contentful";

interface carouselImage {
  title: string;
  image: string;
  description: Document;
}

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
        return this.mapCarouselData();
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
      welcomeTitle:
        typeof welcomeTitle === "object"
          ? documentToReactComponents(welcomeTitle as Document)
          : welcomeTitle,
      informativeText:
        typeof informativeText === "object"
          ? documentToReactComponents(informativeText as Document)
          : informativeText,
      image,
      title: typeof title === "object" ? documentToReactComponents(title as Document) : title,
    };
  }

  private mapCarouselData() {
    const { fields } = this.componentData;
    const carouselImages = fields.carouselImage as Entry[] | null | undefined;
    console.log(fields);

    if (!carouselImages) {
      console.warn("Nenhum item encontrado no carrossel");
      return { items: [] };
    }

    const items: carouselImage[] = carouselImages.map((item: Entry) => {
      const imageField = item.fields.images as { fields?: { file?: { url?: string } } } | undefined;
      console.log(carouselImages);

      if (
        !imageField ||
        !imageField.fields ||
        !imageField.fields.file ||
        !imageField.fields.file.url
      ) {
        console.warn(`Imagem não encontrada ou inválida para o item com ID: ${item.sys.id}`);
        return {
          title: item.fields.title as string,
          image: "",
          description: item.fields.description as Document,
        };
      }

      return {
        title: item.fields.title as string,
        image: imageField.fields.file.url,
        description: item.fields.description as Document,
      };
    });

    return {
      items,
    };
  }
}
