import { EventLog } from "web3";
import { addOrUpdateStaking } from "./stakingModel";
import { ethers } from "ethers";

const updateStakingLiquid = async (pastEvents: EventLog[]) => {
  for (const event of pastEvents) {
    const value = Number(
      parseFloat(
        ethers.formatEther(event.returnValues.amount as string)
      ).toFixed(6)
    );
    await addOrUpdateStaking(event.returnValues.user as string, value);
    console.log(`Staking updated at block ${Number(event.blockNumber)}`);
  }
};

export { updateStakingLiquid };
