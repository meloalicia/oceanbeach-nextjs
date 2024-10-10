import { componentFactory, ContentModelNames } from "../../constants/contentful";

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
      <ComponentToRender {...props} />
    </>
  );
}
