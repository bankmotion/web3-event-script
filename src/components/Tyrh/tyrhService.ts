import { EventLog } from "web3";
import { addOrUpdateTyrh } from "./tyrhModel";
import { ethers } from "ethers";
import { TyrhInterface } from "./tyrhInterface";
import constant from "../../constant";

const updateTyrhLiquid = async (pastEvents: EventLog[], eventType: number) => {
  for (const event of pastEvents) {
    const value = Number(
      parseFloat(
        ethers.formatEther(event.returnValues.value as string)
      ).toFixed(6)
    );
    const paramFrom: TyrhInterface = {
      address: event.returnValues.from as string,
      liquid: eventType === constant.LiquidEventType.Tyrh ? -value : 0,
      burn: eventType === constant.LiquidEventType.Burn ? -value : 0,
      water: eventType === constant.LiquidEventType.Water ? -value : 0,
      plant: eventType === constant.LiquidEventType.Plant ? -value : 0,
      seed: eventType === constant.LiquidEventType.Seed ? -value : 0,
      holy: eventType === constant.LiquidEventType.Holy ? -value : 0,
    };
    const paramTo: TyrhInterface = {
      address: event.returnValues.to as string,
      liquid: eventType === constant.LiquidEventType.Tyrh ? value : 0,
      burn: eventType === constant.LiquidEventType.Burn ? value : 0,
      water: eventType === constant.LiquidEventType.Water ? value : 0,
      plant: eventType === constant.LiquidEventType.Plant ? value : 0,
      seed: eventType === constant.LiquidEventType.Seed ? value : 0,
      holy: eventType === constant.LiquidEventType.Holy ? value : 0,
    };
    await addOrUpdateTyrh(paramFrom);
    await addOrUpdateTyrh(paramTo);
    console.log(event.blockNumber, event.address, eventType);
  }
};

export { updateTyrhLiquid };
