import * as contentful from "contentful";
const client = contentful.createClient({
  space: 'ukn397k0fl34',
  accessToken: '4qoXWMMMASJI4YL8W-FwaCNxzYhihUJUP2fioFFTeg4',
})
client
  .getEntry('1z0jsUHiOcSilS5FJenNmX')
  .then((entry) => console.log(entry))
  .catch((err) => console.log(err));