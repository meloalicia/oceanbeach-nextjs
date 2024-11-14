import { componentFactory, ContentModelNames } from "../../constants/contentful";
import { CarouselProps } from "../Caurosel/index";

type RestComponentProps = {
  [key: string]: unknown;
};

type ComponentRendererProps = RestComponentProps & {
  componentName: ContentModelNames;
};

export default function ComponentRenderer({ componentName, ...props }: ComponentRendererProps) {
  const ComponentToRender = componentFactory[
    componentName
  ] as React.ComponentType<RestComponentProps>;

  return (
    <>
      {componentName === ContentModelNames.Carousel ? (
        <ComponentToRender {...(props as CarouselProps)} />
      ) : (
        <ComponentToRender {...props} />
      )}
    </>
  );
}
