import tyrhEventStart from "../components/Tyrh/tyrhEvent";
import stakingEventStart from "../components/Staking/stakingEvent";
import plantationEventStart from "../components/Plantation/plantationEvent";

const eventMonitorStart = async () => {
  await tyrhEventStart();
  await stakingEventStart();
  await plantationEventStart();
};

export default eventMonitorStart;
