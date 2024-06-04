import { EventLog } from "web3";
import { addOrUpdateTyrh } from "./tyrhModel";
import { ethers } from "ethers";

const updateTyrhLiquid = async (pastEvents: EventLog[]) => {
  for (const event of pastEvents) {
    // console.log(event);
    const value = Number(
      parseFloat(
        ethers.formatEther(event.returnValues.value as string)
      ).toFixed(6)
    );
    await addOrUpdateTyrh({
      address: event.returnValues.from as string,
      liquid: -value,
    });
    await addOrUpdateTyrh({
      address: event.returnValues.to as string,
      liquid: value,
    });
    console.log(`Transfer updated at block ${Number(event.blockNumber)}`);
  }
};

export { updateTyrhLiquid };
