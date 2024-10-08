import { Entry } from "contentful";
import ComponentRenderer from "../components/ComponentRenderer";
import { ContentModelNames } from "../constants/contentful";
import { getEntry } from "../lib/contentfulClient";

async function getHomePageData() {
  return getEntry("1z0jsUHiOcSilS5FJenNmX");
}

export default async function Home() {
  const homePageData = await getHomePageData();
  const pageBody = homePageData?.fields?.pageBody as Entry[];

  return (
    <>
      {pageBody.map(({ fields, sys }) => {
        const componentId = sys.contentType.sys.id as ContentModelNames;
        const componentFields = fields;
        return (
          <ComponentRenderer
            key={componentId}
            componentName={componentId}
            fields={componentFields}
          />
        );
      })}
    </>
  );
}
