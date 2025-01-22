import { ReactNode } from "react";
import styles from "../HeroBanner/HeroBanner.module.scss";

type HeroBannerImage = {
  url: string;
  altText: string;
  title: string;
};

type HeroBannerProps = {
  brandName: ReactNode;
  heroTitle: ReactNode;
  heroSubtitle: ReactNode;
  image: HeroBannerImage;
};

export default function HeroBanner(props: HeroBannerProps) {
  const { brandName, heroTitle, heroSubtitle, image } = props;

  const imageUrl = image.url.startsWith("//") ? `https:${image.url}` : image.url;

  return (
    <div
      className={`${styles.container} ${styles.imageBackground}`}
      style={{
        backgroundImage: `url(${imageUrl})`,
        height: "29rem",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={styles.brandName}>{brandName}</div>
      <div className={styles.contentWrapper}>
        <div className={styles.heroTitle}>{heroTitle}</div>
        <div className={styles.heroSubtitle}>{heroSubtitle}</div>
      </div>
    </div>
  );
}
