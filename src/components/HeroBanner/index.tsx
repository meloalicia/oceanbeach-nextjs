import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
// import Image from "next/image";

type HeroBannerProps = {
  fields: {
    welcomeTitle: Document;
    informativeText: Document;
  };
};

export default function HeroBanner({ fields }: HeroBannerProps) {
  return (
    <div>
      {documentToReactComponents(fields.welcomeTitle)}
      <div>{documentToReactComponents(fields.informativeText)}</div>
    </div>
  );
}
