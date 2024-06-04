import { Web3, EventLog } from "web3";
import colors from "colors";
import fs from "fs";

import constant from "../../constant";
import { BlockInfo } from "../BlockInfo/blockInterface";
import {
  getBlockInfoByName,
  updateBlockInfoByName,
} from "../BlockInfo/blockService";
import config from "../../config";
import { updateStakingLiquid } from "./stakingService";

const stakingJsonFile = "./src/abis/staking.json";
const stakingAbi = JSON.parse(fs.readFileSync(stakingJsonFile, "utf-8"));
const web3 = new Web3(config.rpcProvider);
const stakingContract = new web3.eth.Contract(
  stakingAbi,
  config.tyrhStakingAddress
);

const getPastEvents = async (from: number, to: number) => {
  try {
    const toBlock = Math.min(from + 9000, to);
    const pastEvents = (await stakingContract.getPastEvents(
      "UserStakingAmountChanged",
      {
        fromBlock: from,
        toBlock,
      }
    )) as EventLog[];

    await updateStakingLiquid(pastEvents);

    await updateBlockInfoByName({
      name: constant.BlockName.StakingBlock,
      block: toBlock,
    });

    console.log(`update completed from ${from} to ${toBlock}`);

    if (toBlock < to) {
      await getPastEvents(from + 9001, to);
    }
  } catch (err) {
    console.log(err);
  }
};

const stakingEventStart = async () => {
  try {
    const block: BlockInfo = await getBlockInfoByName({
      name: constant.BlockName.StakingBlock,
    });
    const from = block.block;
    const blockNumber = Number(await web3.eth.getBlockNumber());
    const to = blockNumber;

    if (from === to) {
      console.log(colors.yellow(`No new block in staking event`));
      return;
    }

    console.log(`staking event: getting event between: ${from + 1} and ${to}`);
    await getPastEvents(from + 1, to);
  } catch (err) {
    console.log({ err });
  }
};

export default stakingEventStart;
