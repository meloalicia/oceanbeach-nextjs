import { ReactNode } from "react";
import { EmblaCarousel } from "../EmblaCarousel";
import styles from "./Carousel.module.scss";

type CarouselImage = {
  id: string;
  title: string;
  url: string;
  description: string;
  image: string;
};

export type CarouselProps = {
  carouselTextInformation: ReactNode;
  images: CarouselImage[];
  countryInformation: ReactNode;
  buttonDiscoverCountry: string;
  buttonShowInfo: string;
  buttonBackToImage: string;
};

export default function Carousel({
  carouselTextInformation,
  images,
  countryInformation,
  buttonDiscoverCountry,
  buttonBackToImage,
  buttonShowInfo,
}: CarouselProps) {
  return (
    <div className={styles.carousel}>
      <div className={styles.carouselTextInformation}>{carouselTextInformation}</div>
      <div className={styles.emblaContainer}>
        <div className={styles.countryInformation}>
          <h4>{countryInformation}</h4>
        </div>
        <EmblaCarousel
          images={images}
          countryInformation={countryInformation}
          buttonDiscoverCountry={buttonDiscoverCountry}
          buttonBackToImage={buttonBackToImage}
          buttonShowInfo={buttonShowInfo}
        />
      </div>
    </div>
  );
}
