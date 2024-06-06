import tyrhEventStart from "../components/Tyrh/tyrhEvent";
import stakingEventStart from "../components/Staking/stakingEvent";

const eventMonitorStart = () => {
  tyrhEventStart();
  stakingEventStart();
};

export default eventMonitorStart;
