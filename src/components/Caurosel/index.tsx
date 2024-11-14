import Image from "next/image";
import { ReactNode } from "react";
import "./Carousel.module.scss";

type CarouselImage = {
  title: string;
  url: string;
  description: ReactNode;
};

type CarouselProps = {
  carouselTextInformation: ReactNode;
  images: CarouselImage[];
};

export default function Carousel({ carouselTextInformation, images }: CarouselProps) {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return <p>Nenhum item encontrado no carrossel.</p>;
  }

  return (
    <div className="carousel">
      <div className="carouselTextInformation">{carouselTextInformation}</div>
      {images.map((image, index) => (
        <div key={index} className="slides">
          <Image
            src={image.url.startsWith("//") ? `https:${image.url}` : image.url}
            alt={image.title}
            width={800}
            height={450}
            className="image"
            priority={index === 0}
          />
          <h3 className="title">{image.title}</h3>
          <div className="description">{image.description}</div>
        </div>
      ))}
    </div>
  );
}

export type { CarouselProps };
