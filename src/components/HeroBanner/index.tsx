import { ReactNode } from "react";
import styles from "../HeroBanner/HeroBanner.module.scss";

type HeroBannerImage = {
  url: string;
  altText: string;
  title: string;
};

type HeroBannerProps = {
  welcomeTitle: ReactNode;
  informativeText: ReactNode;
  image: HeroBannerImage;
};

export default function HeroBanner(props: HeroBannerProps) {
  const { welcomeTitle, informativeText, image } = props;

  const imageUrl = image.url.startsWith("//") ? `https:${image.url}` : image.url;

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${imageUrl})`,
        height: "24rem",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {welcomeTitle}
      <div className={styles.informativeText}>{informativeText}</div>
    </div>
  );
}
