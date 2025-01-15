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
  image: CardImage;
};

type CountryBeachCardsContainerProps = {
  cards: CountryBeachCards[];
};

export default function CountryBeachCardsContainer({ cards }: CountryBeachCardsContainerProps) {
  if (!cards || cards.length === 0) {
    console.warn("Nenhum card encontrado");
    return <div>Dados incompletos!</div>;
  }

  return (
    <div className={styles.container}>
      {cards.map((card, index) => {
        return (
          <div
            key={index}
            className={styles.card}
            style={{
              backgroundImage: `url(${card.image.url})`,
            }}
          >
            <div className={styles.countryNames}>{card.countryName}</div>
            <div className={styles.cardsTextInformation}>{card.textInformation}</div>
          </div>
        );
      })}
    </div>
  );
}
