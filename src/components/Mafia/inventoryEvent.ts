import { EventLog, Web3 } from "web3";
import colors from "colors";
import fs from "fs";

import config from "../../config";
const invevntoryJsonFile = "./src/abis/mafiaInventory.json";
const inventoryAbi = JSON.parse(fs.readFileSync(invevntoryJsonFile, "utf-8"));

let web3 = new Web3(config.g4RpcProvider);
const inventoryContractAddr = "0x2c60de22Ec20CcE72245311579c4aD9e5394Adc4";
let inventoryContract = new web3.eth.Contract(
  inventoryAbi,
  inventoryContractAddr
);

const getPastEvents = async (from: number, to: number) => {
  try {
    web3 = new Web3(config.g4RpcProvider);
    inventoryContract = new web3.eth.Contract(
      inventoryAbi,
      inventoryContractAddr
    );

    const toBlock = Math.min(from + 9000, to);
    console.log(`inventory past event started from ${from} to ${toBlock}`);

    const generateEvents = (await inventoryContract.getPastEvents(
      "ItemGenerated",
      {
        fromBlock: from,
        toBlock,
      }
    )) as EventLog[];

    console.log(`${generateEvents.length} generate event`);

    for (const event of generateEvents) {
      const owner = event.returnValues.owner;
      const itemId = event.returnValues.itemId;
      const tx = event.transactionHash;
      const bn = event.blockNumber;

      if (itemId === 1977) {
        console.log(owner, itemId, tx, bn, "generate");
      }
    }

    const transferEvents = (await inventoryContract.getPastEvents(
      "ItemTransferred",
      {
        fromBlock: from,
        toBlock,
      }
    )) as EventLog[];

    console.log(`${transferEvents.length} transfer events`);

    for (const event of transferEvents) {
      const from = event.returnValues.from;
      const to = event.returnValues.to;
      const itemId = event.returnValues.itemId;
      const tx = event.transactionHash;
      const bn = event.blockNumber;

      if (itemId === 1977) {
        console.log(from, to, itemId, tx, bn, "transfer");
      }
    }

    // water liquid past event
    const removeEvents = (await inventoryContract.getPastEvents("ItemRemoved", {
      fromBlock: from,
      toBlock,
    })) as EventLog[];

    console.log(`${removeEvents.length} remove events`);

    for (const event of removeEvents) {
      const itemId = event.returnValues.itemId;
      const tx = event.transactionHash;
      const bn = event.blockNumber;

      if (itemId === 1977) {
        console.log(itemId, tx, bn, "remove");
      }
    }

    console.log(`inventory past event completed from ${from} to ${toBlock}`);

    if (toBlock < to) {
      await getPastEvents(from + 9001, to);
    }
  } catch (err) {
    console.log({ err });
    await getPastEvents(from, to);
  }
};

const inventoryEventStart = async () => {
  try {
    const from = 20622330;
    const blockNumber = Number(await web3.eth.getBlockNumber());
    const to = blockNumber;

    if (from === to) {
      console.log(colors.yellow(`No new block in inventory event`));
      return;
    }

    console.log(
      `inventory event: getting event between: ${from + 1} and ${to}`
    );
    await getPastEvents(from + 1, to);
  } catch (err) {
    console.log({ err });
  }
};

export default inventoryEventStart;
