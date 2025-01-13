import { ReactNode } from "react";
import styles from "./CountryBeachCardsContainer.module.scss";

type CountryBeachCards = {
  fields: {
    title?: string; // Tornando title opcional
    text?: ReactNode; // Tornando text opcional
    image?: {
      fields: {
        file: { url: string };
        description?: string;
      };
    };
  };
};

type CountryBeachCardsContainerProps = {
  cards: CountryBeachCards[];
};

export default function CountryBeachCardsContainer({ cards }: CountryBeachCardsContainerProps) {
  console.log("Cards recebidos:", cards);

  if (!cards || cards.length === 0) {
    console.warn("Nenhum card encontrado");
    return <div>Dados incompletos!</div>;
  }

  return (
    <div className={styles.container}>
      {cards.map((card, index) => {
        const hasImage = card.fields?.image?.fields?.file?.url;

        const backgroundImage = hasImage
          ? card.fields.image!.fields.file.url.startsWith("//")
            ? `https:${card.fields.image!.fields.file.url}`
            : card.fields.image!.fields.file.url
          : ""; // Usar imagem vazia se não existir

        return (
          <div
            key={index}
            className={styles.card}
            style={{
              backgroundImage: `url(${backgroundImage})`,
            }}
          >
            <div className={styles.title}>{card.fields?.title || "Título indisponível"}</div>
            <div className={styles.text}>{card.fields?.text || "Texto indisponível"}</div>
          </div>
        );
      })}
    </div>
  );
}
