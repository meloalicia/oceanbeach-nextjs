import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
type HeroBannerProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: any;
};

export default function HeroBanner({ fields }: HeroBannerProps) {
  return <div>{documentToReactComponents(fields.welcomeTitle)}</div>;
}
