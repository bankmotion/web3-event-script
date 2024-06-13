import { Web3 } from "web3";
import * as Xlsx from "xlsx";
import fs from "fs";
import config from "../../config";
import { formatNft } from "../Tyrh/tyrhModel";
import constant from "../../constant";
import { updateOgNft } from "./ogNftService";
import { ogNftResult } from "./ogNftData";
import { Result } from "./ogNftInterface";

const web3 = new Web3(config.rpcProvider);
const ogNftJsonFile = "./src/abis/ogNft.json";
const ogNftAbi = JSON.parse(fs.readFileSync(ogNftJsonFile, "utf-8"));
const ogNftContract = new web3.eth.Contract(ogNftAbi, config.ogNftAddress);

const getOgNftResults = async () => {
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
  // const result: Map<string, number> = new Map();
  // for (const item of items) {
  //   console.log(item)
  //   const address = item.owner;
  //   if (result.has(address)) {
  //     result.set(address, result.get(address)! + 1);
  //   } else {
  //     result.set(address, 1);
  //   }
  // }
  // const jsonType = [];
  // for (const [address, value] of result) {
  //   jsonType.push({ address, value });
  // }

  const res = [];
  for (const item of items) {
    res.push({
      address: item.owner,
      tokenId: Number(item.tokenId),
      weight: Number(item.weight),
    });
  }
  console.log(JSON.stringify(res));
};

const getElsxForConvertingOgnft = async () => {
  const result: Result = {};
  for (const item of ogNftResult) {
    const { address, weight } = item;
    if (!result[address]) {
      result[address] = { tyrhNft: [0, 0, 0, 0, 0] };
    }
    result[address].tyrhNft[weight - 1] =
      (result[address].tyrhNft[weight - 1] || 0) + 1;
  }

  const addresses = Object.keys(result);
  const resultArr: any = [
    [
      "address",
      "level1",
      "level2",
      "level3",
      "level4",
      "level5",
      "mafia og nft",
    ],
  ];
  addresses.forEach((address) => {
    const { tyrhNft } = result[address];
    let mafiaOgNft = 0;
    constant.OgNftFomular.forEach((multi, index) => {
      mafiaOgNft += multi * tyrhNft[index];
    });
    resultArr.push([
      address,
      tyrhNft[0],
      tyrhNft[1],
      tyrhNft[2],
      tyrhNft[3],
      tyrhNft[4],
      mafiaOgNft,
    ]);
  });
  const wb = Xlsx.utils.book_new();
  const ws = Xlsx.utils.aoa_to_sheet(resultArr);
  Xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
  Xlsx.writeFile(wb, "ognft-convert.xlsx");
  console.log(resultArr);
};

const ogNftEventStart = async () => {
  try {
    // await getOgNftResults();
    await getElsxForConvertingOgnft();
  } catch (err) {
    console.log(`nftEventStart ~ ${err}`);
  }
};

export default ogNftEventStart;
