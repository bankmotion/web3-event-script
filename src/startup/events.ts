import tyrhEventStart from "../components/Tyrh/tyrhEvent";
import stakingEventStart from "../components/Staking/stakingEvent";
import plantationEventStart from "../components/Plantation/plantationEvent";
import nftEventStart from "../components/Nft/nftEvent";
import { writeXlsx } from "../components/Xlsx/xlsxService";
import ogNftEventStart from "../components/OgNft/ogNftEvent";
import {calculatePoints, deleteUnnecessaryAddresses} from "../components/Reward/rewardService";


const eventMonitorStart = async () => {
  // await tyrhEventStart();
  // await stakingEventStart();
  // await plantationEventStart();
  // await nftEventStart();
  // await writeXlsx();
  // await deleteUnnecessaryAddresses();
  await calculatePoints();

  // await ogNftEventStart();

  console.log(`Event end`);
};

export default eventMonitorStart;
