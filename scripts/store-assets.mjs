import { NFTStorage, File } from 'nft.storage';
import fs from 'fs';
import mime from 'mime';
import dotenv from 'dotenv';
dotenv.config();

let data = [];

const API_KEY = process.env.NFT_STORAGE_API_KEY
const DIR = "./assets/"

let rawdata = fs.readFileSync('./assets.json');
let assets = JSON.parse(rawdata);

async function storeAsset() {
    const client = new NFTStorage({ token: API_KEY })

    // Upload each file with metadata from assets.json file and media files in assets
    
    for (let i = 0; i < assets.length; i++) {
      const img = DIR.concat(assets[i].image);
      const nft = {
        image: new File(
          [await fs.promises.readFile(img)],
          assets[i].image,
          { type: mime.getType(img) }
        ),
        name: assets[i].name,
        description: assets[i].description,
        external_url: assets[i].external_url
      }
      const metadata = await client.store(nft)
      console.log(assets[i].name, 'Metadata URI: ', metadata.url)
      var obj = {
        meta: metadata.url
      }
      data.push(obj)
    }

    // Write all metadata to a file to be used for minting
    fs.writeFile ("meta_uri.json", JSON.stringify(data), function(err) {
      if (err) throw err;
      console.log('Complete');
    })
}

storeAsset()
.catch((error) => {
  console.error(error);
  process.exit(1);
});