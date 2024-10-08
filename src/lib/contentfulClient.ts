import * as contentful from "contentful";
import { Entry } from "contentful";

const client = contentful.createClient({
  space: "ukn397k0fl34",
  accessToken: "4qoXWMMMASJI4YL8W-FwaCNxzYhihUJUP2fioFFTeg4",
});

async function getEntry(id: string): Promise<Entry | null> {
  try {
    const entry = await client.getEntry(id);
    return entry;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { getEntry };
