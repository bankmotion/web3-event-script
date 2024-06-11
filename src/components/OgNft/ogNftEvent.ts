import { Web3 } from "web3";
import fs from "fs";
import config from "../../config";
import { formatNft } from "../Tyrh/tyrhModel";
import constant from "../../constant";
import { updateOgNft } from "./ogNftService";

const web3 = new Web3(config.rpcProvider);
const ogNftJsonFile = "./src/abis/ogNft.json";
const ogNftAbi = JSON.parse(fs.readFileSync(ogNftJsonFile, "utf-8"));
const ogNftContract = new web3.eth.Contract(ogNftAbi, config.ogNftAddress);

const ogNftEventStart = async () => {
  try {
    let start = 0;
    const length = 200;
    const items: any[] = [];
    while (true) {
      const result: any[] = await ogNftContract.methods
        .getNFTs(start, length)
        .call();
      start += length;
      if (result.length === 0) {
        break;
      }
      items.push(...result);
    }
    const result: Map<string, number> = new Map();
    for (const item of items) {
      const address = item.owner;
      if (result.has(address)) {
        result.set(address, result.get(address)! + 1);
      } else {
        result.set(address, 1);
      }
    }
    const jsonType = [];
    for (const [address, value] of result) {
      jsonType.push({ address, value });
    }
    console.log(JSON.stringify(jsonType));
  } catch (err) {
    console.log(`nftEventStart ~ ${err}`);
  }
};

export default ogNftEventStart;
