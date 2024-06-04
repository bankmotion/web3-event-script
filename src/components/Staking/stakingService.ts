import { EventLog } from "web3";
import { ethers } from "ethers";
import { addOrUpdateTyrh } from "../Tyrh/tyrhModel";

const updateStakingLiquid = async (pastEvents: EventLog[]) => {
  for (const event of pastEvents) {
    const value = Number(
      parseFloat(
        ethers.formatEther(event.returnValues.amount as string)
      ).toFixed(6)
    );
    await addOrUpdateTyrh({
      address: event.returnValues.user as string,
      staking: value,
    });
    console.log(`Staking updated at block ${Number(event.blockNumber)}`);
  }
};

export { updateStakingLiquid };
