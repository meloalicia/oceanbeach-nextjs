import Image from "next/image";
import { ReactNode } from "react";
import styles from "./CountryBeachCardsContainer.module.scss";

type CardImage = {
  title: string;
  url: string;
  description: string;
  image: string;
};

type CountryBeachCards = {
  countryName: string;
  textInformation: ReactNode;
  cardButton: string;
  image: CardImage;
};

type CountryBeachCardsContainerProps = {
  cards: CountryBeachCards[];
  containerTitle: string;
};

export default function CountryBeachCardsContainer({
  cards,
  containerTitle,
}: CountryBeachCardsContainerProps) {
  if (!cards || cards.length === 0) {
    console.warn("Nenhum card encontrado");
    return <div>Dados incompletos!</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerTitle}>{containerTitle}</div>
      <div className={styles.cardsContainer}>
        {cards.map((card, index) => {
          return (
            <div key={index} className={styles.card}>
              <div className={styles.cardImage}>
                <Image src={card.image.url} alt={card.image.description} width={288} height={263} />
              </div>
              <div className={styles.countryNames}>{card.countryName}</div>
              <div className={styles.cardsTextInformation}>{card.textInformation}</div>
              <button className={styles.cardButton}>{card.cardButton}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
