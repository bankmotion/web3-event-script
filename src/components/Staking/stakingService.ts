import { EventLog } from "web3";
import { ethers } from "ethers";
import { addOrUpdateTyrh } from "../Tyrh/tyrhModel";
import { TyrhInterface } from "../Tyrh/tyrhInterface";

const updateStakingLiquid = async (tyrhObject: TyrhInterface) => {
  console.log(tyrhObject);
  await addOrUpdateTyrh(tyrhObject);
};

export { updateStakingLiquid };
