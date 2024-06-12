import constant from "../../constant";
import { TyrhInterface } from "../Tyrh/tyrhInterface";
import { addOrUpdateTyrh } from "../Tyrh/tyrhModel";

const updateNft = async (address: string, nftType: number) => {
  console.log({ nftType, address });
  const tyrhObject: TyrhInterface = {
    address,
    yieldBoosters5: nftType === constant.NftType.YieldBoosters5 ? 1 : 0,
    yieldBoosters15: nftType === constant.NftType.YieldBoosters15 ? 1 : 0,
    yieldBoosters30: nftType === constant.NftType.YieldBoosters30 ? 1 : 0,
    yieldBoosters50: nftType === constant.NftType.YieldBoosters50 ? 1 : 0,
    yieldBoostersRandom:
      nftType === constant.NftType.YieldBoostersRandom ? 1 : 0,
    seedYieldBoosters10:
      nftType === constant.NftType.SeedYieldBoosters10 ? 1 : 0,
    seedYieldBoosters25:
      nftType === constant.NftType.SeedYieldBoosters25 ? 1 : 0,
    seedYieldBoosters50:
      nftType === constant.NftType.SeedYieldBoosters50 ? 1 : 0,
    seedYieldBoosters100:
      nftType === constant.NftType.SeedYieldBoosters100 ? 1 : 0,
    sproutYieldBoosters5:
      nftType === constant.NftType.SproutYieldBoosters5 ? 1 : 0,
    sproutYieldBoosters10:
      nftType === constant.NftType.SproutYieldBoosters10 ? 1 : 0,
    sproutYieldBoosters15:
      nftType === constant.NftType.SproutYieldBoosters15 ? 1 : 0,
    sproutYieldBoostersRandom:
      nftType === constant.NftType.SproutYieldBoostersRandom ? 1 : 0,
    holyYieldBoosters10:
      nftType === constant.NftType.HolyYieldBoosters10 ? 1 : 0,
    holyYieldBoosters25:
      nftType === constant.NftType.HolyYieldBoosters25 ? 1 : 0,
    holyYieldBoosters50:
      nftType === constant.NftType.HolyYieldBoosters50 ? 1 : 0,
    holyYieldBoosters100:
      nftType === constant.NftType.HolyYieldBoosters100 ? 1 : 0,
    reduceTreeTime25: nftType === constant.NftType.ReduceTreeTime25 ? 1 : 0,
    reduceTreeTime50: nftType === constant.NftType.ReduceTreeTime50 ? 1 : 0,
    reduceTreeTime75: nftType === constant.NftType.ReduceTreeTime75 ? 1 : 0,
    reduceTreeTimeRandom:
      nftType === constant.NftType.ReduceTreeTimeRandom ? 1 : 0,
    reduceSeedTime10: nftType === constant.NftType.ReduceSeedTime10 ? 1 : 0,
    reduceSeedTime25: nftType === constant.NftType.ReduceSeedTime25 ? 1 : 0,
    reduceSeedTime50: nftType === constant.NftType.ReduceSeedTime50 ? 1 : 0,
    lessWater10: nftType === constant.NftType.LessWater10 ? 1 : 0,
    lessWater25: nftType === constant.NftType.LessWater25 ? 1 : 0,
    lessWater50: nftType === constant.NftType.LessWater50 ? 1 : 0,
    lessWaterRandom: nftType === constant.NftType.LessWaterRandom ? 1 : 0,
    treatment10: nftType === constant.NftType.Treatment10 ? 1 : 0,
    treatment25: nftType === constant.NftType.Treatment25 ? 1 : 0,
    treatment50: nftType === constant.NftType.Treatment50 ? 1 : 0,
    specialsRhWallet: nftType === constant.NftType.SpecialsRhWakllet ? 1 : 0,
    specialsLiquidKing: nftType === constant.NftType.SpecialsLiquidKing ? 1 : 0,
    specialsMystery: nftType === constant.NftType.SpecialsMystery ? 1 : 0,
    specialsRandom: nftType === constant.NftType.SpecialsRandom ? 1 : 0,
    leagueBoosters: nftType === constant.NftType.LeagueBoosters ? 1 : 0,
    leagueBoostersRandom:
      nftType === constant.NftType.LeagueBoostersRandom ? 1 : 0,
    claimBoosters5: nftType === constant.NftType.ClaimBoosters5 ? 1 : 0,
    claimBoosters10: nftType === constant.NftType.ClaimBoosters10 ? 1 : 0,
    claimBoosters15: nftType === constant.NftType.ClaimBoosters15 ? 1 : 0,
    claimBoostersRandom:
      nftType === constant.NftType.ClaimBoostersRandom ? 1 : 0,
    waterFountain: nftType === constant.NftType.WaterFountain ? 1 : 0,
  };
  await addOrUpdateTyrh(tyrhObject);
};

export { updateNft };
