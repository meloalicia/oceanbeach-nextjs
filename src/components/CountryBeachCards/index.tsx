import { ReactNode } from "react";
import styles from "../CountryBeachCards/CountryBeachCards.module.scss";

type CountryBeachCardsImages = {
  url: string;
  altText: string;
  title: string;
};

type CountryBeachCardsProps = {
  beachCardsCountryNames: ReactNode;
  beachCardsTextInformation: ReactNode;
  image?: CountryBeachCardsImages;
};

export default function CountryBeachCards(props: CountryBeachCardsProps) {
  const { beachCardsCountryNames, beachCardsTextInformation, image } = props;

  const imageUrl = image?.url
    ? image.url.startsWith("//")
      ? `https:${image.url}`
      : image.url
    : "";

  if (!beachCardsCountryNames || !beachCardsTextInformation) {
    console.warn("Dados incompletos:", {
      beachCardsCountryNames,
      beachCardsTextInformation,
      image,
    });
    return <div>Dados incompletos!</div>;
  }

  return (
    <div
      className={`${styles.container} ${styles.card}`}
      style={{
        ...(imageUrl && { backgroundImage: `url(${imageUrl})` }),
      }}
    >
      <div className={styles.countryNames}>
        {beachCardsCountryNames || "Nomes de países não disponíveis"}
      </div>
      <div className={styles.cardsTextInformation}>
        {beachCardsTextInformation || "Informações não disponíveis"}
      </div>
    </div>
  );
}
