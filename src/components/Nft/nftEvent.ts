import { Web3 } from "web3";
import fs from "fs";
import config from "../../config";
import { formatNft } from "../Tyrh/tyrhModel";
import constant from "../../constant";
import { updateNft } from "./nftService";

const web3 = new Web3(config.rpcProvider);
const nftJsonFile = "./src/abis/nft.json";
const nftAbi = JSON.parse(fs.readFileSync(nftJsonFile, "utf-8"));
const nftContract = new web3.eth.Contract(nftAbi, config.nftAddress);

const nftEventStart = async () => {
  try {
    await formatNft();
    let start = 0;
    const length = 200;
    while (true) {
      const result: any[] = await nftContract.methods
        .getNFTs(start, length)
        .call();
      start += length;
      if (result.length === 0) {
        break;
      }

      for (const item of result) {
        const nftType = Number(item[constant.NftId.TypeId]);
        const address = item[constant.NftId.Owner] as string;
        if (nftType) {
          await updateNft(address, nftType);
        }
      }
    }
  } catch (err) {
    console.log(`nftEventStart ~ ${err}`);
  }
};

export default nftEventStart;
