import Image from "next/image";
import { ReactNode } from "react";
import styles from "./Carousel.module.scss";

type CarouselImage = {
  title: string;
  url: string;
  description: ReactNode;
};

type CarouselProps = {
  carouselTextInformation: ReactNode;
  images: CarouselImage[];
};

export default function Carousel(props: CarouselProps) {
  const { carouselTextInformation, images } = props;

  if (!images || !Array.isArray(images) || images.length === 0) {
    return <p>Nenhum item encontrado no carrossel.</p>;
  }

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselTextInformation}>{carouselTextInformation}</div>
      {images.map((image, index) => {
        const imageUrl = image.url.startsWith("//") ? `https:${image.url}` : image.url;

        return (
          <div key={index} className={styles.slides}>
            <Image
              src={imageUrl}
              alt={image.title}
              width={800}
              height={450}
              className={styles.image}
              priority={index === 0}
            />
            <h3 className={styles.carouselTextInformation}>{image.title}</h3>
            <div className={styles.description}>{image.description}</div>
          </div>
        );
      })}
    </div>
  );
}
