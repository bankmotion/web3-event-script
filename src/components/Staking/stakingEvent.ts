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
import { ethers } from "ethers";
import { StakeInfo } from "./stakeInterface";

const stakingJsonFile = "./src/abis/staking.json";
const stakingAbi = JSON.parse(fs.readFileSync(stakingJsonFile, "utf-8"));
const web3 = new Web3(config.rpcProvider);
const stakingContract = new web3.eth.Contract(
  stakingAbi,
  config.tyrhStakingAddress
);

const stakingEventStart = async () => {
  try {
    for (let i = 0; i < 10000; i++) {
      const stakeInfo: StakeInfo = await stakingContract.methods
        .stakeList(i)
        .call();
      if ((stakeInfo.isFinished as boolean) === false) {
        const value = Number(
          ethers.formatEther(stakeInfo.amount.toString())
        ).toFixed(6);
        await updateStakingLiquid(stakeInfo.user, value, stakeInfo.id);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export default stakingEventStart;
