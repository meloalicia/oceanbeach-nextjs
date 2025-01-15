import { ReactNode } from "react";
import { EmblaCarousel } from "../EmblaCarousel";
import styles from "./Carousel.module.scss";

type CarouselImage = {
  title: string;
  url: string;
  description: string;
  image: string;
};

export type CarouselProps = {
  carouselTextInformation: ReactNode;
  images: CarouselImage[];
};

export default function Carousel(props: CarouselProps) {
  const { carouselTextInformation, images } = props;

  //console.log("Carousel Props:", props);

  if (!images || !Array.isArray(images) || images.length === 0) {
    //return <p>Nenhum item encontrado no carrossel.</p>;
  }

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselTextInformation}>{carouselTextInformation}</div>
      <EmblaCarousel images={images} />
    </div>
  );
}
