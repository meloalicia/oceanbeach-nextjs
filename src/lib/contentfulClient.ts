import * as contentful from "contentful";
import { Entry } from "contentful";
import dotenv from "dotenv";

dotenv.config();

const client = contentful.createClient({
  space: "ukn397k0fl34",
  accessToken: "4qoXWMMMASJI4YL8W-FwaCNxzYhihUJUP2fioFFTeg4",
});

async function getEntry(id: string): Promise<Entry | null> {
  try {
    const entry = await client.getEntry(id, {
      include: 5,
    });
    return entry;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { getEntry };
