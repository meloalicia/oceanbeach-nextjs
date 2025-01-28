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
  countryInformation: ReactNode;
};

export default function Carousel(props: CarouselProps) {
  const { carouselTextInformation, images, countryInformation } = props;

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselTextInformation}>{carouselTextInformation}</div>
      <div className={styles.emblaContainer}>
        <div className={styles.countryInformation}>
          <h4>{countryInformation}</h4>
        </div>
        <EmblaCarousel images={images} />
      </div>
    </div>
  );
}
