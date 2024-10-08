/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentModelNames } from "../../constants/contentful";
import HeroBanner from "../HeroBanner";

type ComponentRendererProps = {
  componentName: ContentModelNames;
  [key: string]: any;
};

export const componentMapper: Record<ContentModelNames, React.ComponentType<any>> = {
  [ContentModelNames.HeroBanner]: HeroBanner,
};

export default function ComponentRenderer({ componentName, ...props }: ComponentRendererProps) {
  const ComponentToRender = componentMapper[componentName];

  return (
    <>
      <ComponentToRender {...props} />
    </>
  );
}
