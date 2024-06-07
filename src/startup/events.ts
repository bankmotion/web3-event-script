import tyrhEventStart from "../components/Tyrh/tyrhEvent";
import stakingEventStart from "../components/Staking/stakingEvent";
import plantationEventStart from "../components/Plantation/plantationEvent";
import nftEventStart from "../components/Nft/nftEvent";

const eventMonitorStart = async () => {
  // await tyrhEventStart();
  // await stakingEventStart();
  // await plantationEventStart();
  await nftEventStart();

  console.log(`Event end`);
};

export default eventMonitorStart;
