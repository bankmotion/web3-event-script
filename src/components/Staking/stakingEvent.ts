import { Web3 } from "web3";
import fs from "fs";

import constant from "../../constant";
import config from "../../config";
import { updateStakingLiquid } from "./stakingService";
import { ethers } from "ethers";
import { BonfireUserInfo, StakeInfo } from "./stakeInterface";
import { getAllAddress } from "../Tyrh/tyrhModel";
import { TyrhInterface } from "../Tyrh/tyrhInterface";

const web3 = new Web3(config.rpcProvider);
const stakingJsonFile = "./src/abis/staking.json";
const stakingAbi = JSON.parse(fs.readFileSync(stakingJsonFile, "utf-8"));
const tyrhStakingContract = new web3.eth.Contract(
  stakingAbi,
  config.tyrhStakingAddress
);
const bonfireJsonFile = "./src/abis/bonfire.json";
const bonfireAbi = JSON.parse(fs.readFileSync(bonfireJsonFile, "utf-8"));
const bonfireContract = new web3.eth.Contract(
  bonfireAbi,
  config.bonfireAddress
);
const sproutHouseJsonFile = "./src/abis/sproutHouse.json";
const sproutHouseAbi = JSON.parse(
  fs.readFileSync(sproutHouseJsonFile, "utf-8")
);
const sproutHouseContract = new web3.eth.Contract(
  sproutHouseAbi,
  config.sproutHouseAddress
);
const seedBankJsonFile = "./src/abis/seedBank.json";
const seedBankAbi = JSON.parse(fs.readFileSync(seedBankJsonFile, "utf-8"));
const seedBankContract = new web3.eth.Contract(
  seedBankAbi,
  config.seedbankAddress
);

const stakingEventStart = async () => {
  try {
    const list: TyrhInterface[] = await getAllAddress();
    for (const item of list) {
      // item.address = "0x605C8152D04fc6d5a41698B64B495aB4663F9FF1";
      const tyrhStakeInfo: StakeInfo = await tyrhStakingContract.methods
        .userStakingInfo(item.address)
        .call();
      const tyrhStakeAmount = Number(
        ethers.formatEther(tyrhStakeInfo.totalAmount.toString())
      );
      const bonfireUserInfo: BonfireUserInfo = await bonfireContract.methods
        .userInfo(item.address)
        .call();
      const bonfireAmount = Number(
        ethers.formatEther(bonfireUserInfo.amount.toString())
      );

      const sproutHouseStakingList: any = await sproutHouseContract.methods
        .getUserStakingList(item.address)
        .call();
      let sproutHouseAmount = 0;
      for (const item of sproutHouseStakingList) {
        if (item[constant.SproutHouseObjectId.Finished] === false) {
          sproutHouseAmount += Number(
            ethers.formatEther(
              item[constant.SproutHouseObjectId.Amount].toString()
            )
          );
        }
      }

      let seedBankStakingInfo: any = await seedBankContract.methods
        .getUserStakingInfo(item.address)
        .call();
      let seedBankStakingAmount = seedBankStakingInfo[
        constant.SeedBankUserInfoObjectId.IsStaking
      ]
        ? Number(
            ethers.formatEther(
              seedBankStakingInfo[
                constant.SeedBankUserInfoObjectId.Amount
              ].toString()
            )
          )
        : 0;

      const tyrhObject: TyrhInterface = {
        address: item.address,
        stakedTyrh: Number(tyrhStakeAmount.toFixed(6)),
        stakedBurn: Number(bonfireAmount.toFixed(6)),
        stakedPlant: Number(
          (sproutHouseAmount + seedBankStakingAmount).toFixed(6)
        ),
      };
      await updateStakingLiquid(tyrhObject);
    }
  } catch (err) {
    console.log(err);
  }
};

export default stakingEventStart;
