import { EventLog, Web3 } from "web3";
import colors from "colors";
import fs from "fs";

import constant from "../../constant";
import {
  getBlockInfoByName,
  updateBlockInfoByName,
} from "../BlockInfo/blockService";
import config from "../../config";
import { updateTyrhLiquid } from "./tyrhService";
import { BlockInfo } from "../BlockInfo/blockInterface";
const tyrhJsonFile = "./src/abis/tyrh.json";
const tyrhAbi = JSON.parse(fs.readFileSync(tyrhJsonFile, "utf-8"));
const burnJsonFile = "./src/abis/burn.json";
const burnAbi = JSON.parse(fs.readFileSync(burnJsonFile, "utf-8"));
const waterJsonFile = "./src/abis/water.json";
const waterAbi = JSON.parse(fs.readFileSync(waterJsonFile, "utf-8"));
const plantJsonFile = "./src/abis/plant.json";
const plantAbi = JSON.parse(fs.readFileSync(plantJsonFile, "utf-8"));
const seedJsonFile = "./src/abis/seed.json";
const seedAbi = JSON.parse(fs.readFileSync(seedJsonFile, "utf-8"));
const holyJsonFile = "./src/abis/holy.json";
const holyAbi = JSON.parse(fs.readFileSync(holyJsonFile, "utf-8"));

const web3 = new Web3(config.rpcProvider);
const tyrhContract = new web3.eth.Contract(tyrhAbi, config.tyrhAddress);
const burnContract = new web3.eth.Contract(burnAbi, config.burnAddress);
const waterContract = new web3.eth.Contract(waterAbi, config.waterAddress);
const plantContract = new web3.eth.Contract(plantAbi, config.plantAddress);
const seedContract = new web3.eth.Contract(seedAbi, config.seedAddress);
const holyContract = new web3.eth.Contract(holyAbi, config.holyAddress);

const getPastEvents = async (from: number, to: number) => {
  try {
    const toBlock = Math.min(from + 9000, to);

    console.log(`liquid past event started from ${from} to ${toBlock}`);

    // tyrh liquid past event
    const tyrhPastEvents = (await tyrhContract.getPastEvents("Transfer", {
      fromBlock: from,
      toBlock,
    })) as EventLog[];
    await updateTyrhLiquid(tyrhPastEvents, constant.LiquidEventType.Tyrh);
    console.log(`tyrh liquid updated`);

    // burn liquid past event
    const burnPastEvents = (await burnContract.getPastEvents("Transfer", {
      fromBlock: from,
      toBlock,
    })) as EventLog[];
    await updateTyrhLiquid(burnPastEvents, constant.LiquidEventType.Burn);
    console.log(`burn liquid updated`);

    // water liquid past event
    const waterPastEvents = (await waterContract.getPastEvents("Transfer", {
      fromBlock: from,
      toBlock,
    })) as EventLog[];
    await updateTyrhLiquid(waterPastEvents, constant.LiquidEventType.Water);
    console.log(`water liquid updated`);

    // plant liquid past event
    const plantPastEvents = (await plantContract.getPastEvents("Transfer", {
      fromBlock: from,
      toBlock,
    })) as EventLog[];
    await updateTyrhLiquid(plantPastEvents, constant.LiquidEventType.Plant);
    console.log(`plant liquid updated`);

    // seed liquid past event
    const seedPastEvents = (await seedContract.getPastEvents("Transfer", {
      fromBlock: from,
      toBlock,
    })) as EventLog[];
    await updateTyrhLiquid(seedPastEvents, constant.LiquidEventType.Seed);
    console.log(`seed liquid updated`);

    // holy liquid past event
    const holyPastEvents = (await holyContract.getPastEvents("Transfer", {
      fromBlock: from,
      toBlock,
    })) as EventLog[];
    await updateTyrhLiquid(holyPastEvents, constant.LiquidEventType.Holy);
    console.log(`holy liquid updated`);

    await updateBlockInfoByName({
      name: constant.BlockName.TyrhBlock,
      block: toBlock,
    });

    console.log(`tyrh liquid past event completed from ${from} to ${toBlock}`);

    if (toBlock < to) {
      await getPastEvents(from + 9001, to);
    }
  } catch (err) {
    console.log({ err });
  }
};

const tyrhEventStart = async () => {
  try {
    const block: BlockInfo = await getBlockInfoByName({
      name: constant.BlockName.TyrhBlock,
    });
    const from = block.block;
    const blockNumber = Number(await web3.eth.getBlockNumber());
    const to = blockNumber;

    if (from === to) {
      console.log(colors.yellow(`No new block in transfer event`));
      return;
    }

    console.log(`tyrh event: getting event between: ${from + 1} and ${to}`);
    await getPastEvents(from + 1, to);
  } catch (err) {
    console.log({ err });
  }
};

export default tyrhEventStart;
