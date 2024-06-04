import { EventLog } from "web3";
import { addOrUpdateLiquid } from "./tyrhModel";
import { ethers } from "ethers";

const updateTyrhLiquid = async (pastEvents: EventLog[]) => {
  for (const event of pastEvents) {
    // console.log(event);
    const value = Number(
      parseFloat(
        ethers.formatEther(event.returnValues.value as string)
      ).toFixed(6)
    );
    await addOrUpdateLiquid(event.returnValues.from as string, -value);
    await addOrUpdateLiquid(event.returnValues.to as string, value);
  }
};

export { updateTyrhLiquid };
