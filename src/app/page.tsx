import { Entry } from "contentful";
import { getEntry } from "../clients/contentfulClient";
import ComponentRenderer from "../components/ComponentRenderer";
import { ContentModelNames } from "../constants/contentful";
import { ContentfulDataMapper } from "../mappers/ContentfulDataMapper";

async function getHomePageData() {
  try {
    const homePageEntry = await getEntry("1z0jsUHiOcSilS5FJenNmX");
    if (!homePageEntry) {
      console.error("Entrada não encontrada ou retorno vazio.");
      return null;
    }
    console.log(homePageEntry);
    return homePageEntry;
  } catch (error) {
    console.error("Erro ao buscar a entrada do Contentful:", error);
    return null;
  }
}

export default async function Home() {
  const homePageData = await getHomePageData();

  if (!homePageData || !homePageData.fields || !homePageData.fields.pageBody) {
    return <div>Erro ao carregar os dados da página inicial.</div>;
  }

  const pageBody = homePageData.fields.pageBody as Entry[];

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
