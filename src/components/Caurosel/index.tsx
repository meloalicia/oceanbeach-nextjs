import Image from "next/image";
import { ReactNode } from "react";
import styles from "./Carousel.module.scss";

type CarouselItem = {
  url: string;
  title: string;
  description: ReactNode;
};

type CarouselProps = {
  title: ReactNode;
  items: CarouselItem[];
};

export default function Carousel({ title, items }: CarouselProps) {
  if (!items || items.length === 0) {
    return <p>Nenhum item encontrado no carrossel.</p>;
  }

  return (
    <div className={styles.carousel}>
      <h2 className={styles.carouselTitle}>{title}</h2>
      {items.map((item, index) => {
        const imageUrl = item.url.startsWith("//") ? `https:${item.url}` : item.url;

        return (
          <div key={index} className={styles.carouselItem}>
            <Image
              src={imageUrl}
              alt={item.title}
              width={800}
              height={450}
              className={styles.image}
              priority={index === 0}
            />
            <h3 className={styles.title}>{item.title}</h3>
            <div className={styles.description}>{item.description}</div>
          </div>
        );
      })}
    </div>
  );
}
