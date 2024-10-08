import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Entry } from "contentful";
import { getEntry } from "../lib/contentfulClient";

async function getHomePageData() {
  return getEntry("1z0jsUHiOcSilS5FJenNmX");
}

export default async function Home() {
  const homePageData = await getHomePageData();
  const pageBody = homePageData?.fields?.pageBody as Entry[];
  const welcomeTitle = documentToReactComponents(
    // @ts-expect-error aaa
    pageBody?.[0]?.fields.welcomeTitle
  );
  console.log(pageBody);
  return <div>{welcomeTitle}</div>;
}
