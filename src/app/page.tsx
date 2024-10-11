import { Entry } from "contentful";
import ComponentRenderer from "../components/ComponentRenderer";
import { ContentModelNames } from "../constants/contentful";
import { getEntry } from "../lib/contentfulClient";
import { ContentfulDataMapper } from "../mappers/ContentfulDataMapper";

async function getHomePageData() {
  return getEntry("1z0jsUHiOcSilS5FJenNmX");
}

export default async function Home() {
  const homePageData = await getHomePageData();
  const pageBody = homePageData?.fields?.pageBody as Entry[];

  return (
    <>
      {pageBody.map((componentData) => {
        const componentId = componentData.sys.contentType.sys.id as ContentModelNames;
        const contentfulMapper = new ContentfulDataMapper(componentData);
        const componentProps = contentfulMapper.mapContentfulData();

        return (
          <ComponentRenderer key={componentId} componentName={componentId} {...componentProps} />
        );
      })}
    </>
  );
}
