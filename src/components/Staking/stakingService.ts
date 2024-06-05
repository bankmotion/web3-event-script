import { EventLog } from "web3";
import { ethers } from "ethers";
import { addOrUpdateTyrh } from "../Tyrh/tyrhModel";

const updateStakingLiquid = async (
  address: string,
  value: string,
  id: number
) => {
  await addOrUpdateTyrh({
    address,
    staking: Number(value),
  });
  console.log(`Staking updated at stake id ${id}`);
};

export { updateStakingLiquid };
