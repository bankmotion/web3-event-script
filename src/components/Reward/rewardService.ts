import * as Xlsx from "xlsx";
import { TyrhInterface } from "../Tyrh/tyrhInterface";
import { getAllAddress } from "../Tyrh/tyrhModel";
import constant from "../../constant";

const calculatePoints = async () => {
  const wallets: TyrhInterface[] = await getAllAddress();
  const data: any = [["address", "point", "mafia"]];
  let totalPoint = 0;
  const mafiaSupply = 700000000;
  for (const wallet of wallets) {
    const point =
      (wallet.liquid ?? 0) * constant.PointsWeight.Tyrh +
      (wallet.stakedTyrh ?? 0) * constant.PointsWeight.StakedTyrh +
      (wallet.burn ?? 0) * constant.PointsWeight.LiquidBurn +
      (wallet.water ?? 0) * constant.PointsWeight.LiquidWater +
      (wallet.plant ?? 0) * constant.PointsWeight.LiquidPlant +
      (wallet.stakedBurn ?? 0) * constant.PointsWeight.StakedBurn +
      (wallet.stakedPlant ?? 0) * constant.PointsWeight.StakedPlant +
      (wallet.stakedWater ?? 0) * constant.PointsWeight.StakedWater +
      (wallet.seed ?? 0) * constant.PointsWeight.LiquidSeed +
      (wallet.holy ?? 0) * constant.PointsWeight.LiquidHoly +
      (wallet.cattails ?? 0) * constant.PointsWeight.Cattails +
      (wallet.bush ?? 0) * constant.PointsWeight.Bush +
      (wallet.tree ?? 0) * constant.PointsWeight.Tree +
      (wallet.pine ?? 0) * constant.PointsWeight.Pine +
      (wallet.palm ?? 0) * constant.PointsWeight.Palm +
      (wallet.sherman ?? 0) * constant.PointsWeight.Sherman +
      (wallet.yieldBoosters5 ?? 0) * constant.PointsWeight.YieldBoosters5 +
      (wallet.yieldBoosters15 ?? 0) * constant.PointsWeight.YieldBoosters15 +
      (wallet.yieldBoosters30 ?? 0) * constant.PointsWeight.YieldBoosters30 +
      (wallet.yieldBoosters50 ?? 0) * constant.PointsWeight.YieldBoosters50 +
      (wallet.yieldBoostersRandom ?? 0) *
        constant.PointsWeight.YieldBoostersRandom +
      (wallet.seedYieldBoosters10 ?? 0) *
        constant.PointsWeight.SeedYieldBoosters10 +
      (wallet.seedYieldBoosters25 ?? 0) *
        constant.PointsWeight.SeedYieldBoosters25 +
      (wallet.seedYieldBoosters50 ?? 0) *
        constant.PointsWeight.SeedYieldBoosters50 +
      (wallet.seedYieldBoosters100 ?? 0) *
        constant.PointsWeight.SeedYieldBoosters100 +
      (wallet.sproutYieldBoosters5 ?? 0) *
        constant.PointsWeight.SproutYieldBoosters5 +
      (wallet.sproutYieldBoosters10 ?? 0) *
        constant.PointsWeight.SproutYieldBoosters10 +
      (wallet.sproutYieldBoosters15 ?? 0) *
        constant.PointsWeight.SproutYieldBoosters15 +
      (wallet.sproutYieldBoostersRandom ?? 0) *
        constant.PointsWeight.SproutYieldBoostersRandom +
      (wallet.holyYieldBoosters10 ?? 0) *
        constant.PointsWeight.HolyYieldBoosters10 +
      (wallet.holyYieldBoosters25 ?? 0) *
        constant.PointsWeight.HolyYieldBoosters25 +
      (wallet.holyYieldBoosters50 ?? 0) *
        constant.PointsWeight.HolyYieldBoosters50 +
      (wallet.holyYieldBoosters100 ?? 0) *
        constant.PointsWeight.HolyYieldBoosters100 +
      (wallet.reduceTreeTime25 ?? 0) * constant.PointsWeight.ReduceTreeTime25 +
      (wallet.reduceTreeTime50 ?? 0) * constant.PointsWeight.ReduceTreeTime50 +
      (wallet.reduceTreeTime75 ?? 0) * constant.PointsWeight.ReduceTreeTime75 +
      (wallet.reduceTreeTimeRandom ?? 0) *
        constant.PointsWeight.ReduceTreeTimeRandom +
      (wallet.reduceSeedTime10 ?? 0) * constant.PointsWeight.ReduceSeedTime10 +
      (wallet.reduceSeedTime25 ?? 0) * constant.PointsWeight.ReduceSeedTime25 +
      (wallet.reduceSeedTime50 ?? 0) * constant.PointsWeight.ReduceSeedTime50 +
      (wallet.lessWater10 ?? 0) * constant.PointsWeight.LessWater10 +
      (wallet.lessWater25 ?? 0) * constant.PointsWeight.LessWater25 +
      (wallet.lessWater50 ?? 0) * constant.PointsWeight.LessWater50 +
      (wallet.lessWaterRandom ?? 0) * constant.PointsWeight.LessWaterRandom +
      (wallet.treatment10 ?? 0) * constant.PointsWeight.Treatment10 +
      (wallet.treatment25 ?? 0) * constant.PointsWeight.Treatment25 +
      (wallet.treatment50 ?? 0) * constant.PointsWeight.Treatment50 +
      (wallet.specialsRhWallet ?? 0) * constant.PointsWeight.SpecialsRhWakllet +
      (wallet.specialsLiquidKing ?? 0) *
        constant.PointsWeight.SpecialsLiquidKing +
      (wallet.specialsMystery ?? 0) * constant.PointsWeight.SpecialsMystery +
      (wallet.specialsRandom ?? 0) * constant.PointsWeight.SpecialsRandom +
      (wallet.leagueBoosters ?? 0) * constant.PointsWeight.LeagueBoosters +
      (wallet.leagueBoostersRandom ?? 0) *
        constant.PointsWeight.LeagueBoostersRandom +
      (wallet.claimBoosters5 ?? 0) * constant.PointsWeight.ClaimBoosters5 +
      (wallet.claimBoosters10 ?? 0) * constant.PointsWeight.ClaimBoosters10 +
      (wallet.claimBoosters15 ?? 0) * constant.PointsWeight.ClaimBoosters15 +
      (wallet.claimBoostersRandom ?? 0) *
        constant.PointsWeight.ClaimBoostersRandom +
      (wallet.waterFountain ?? 0) * constant.PointsWeight.WaterFountain;

    totalPoint += point;
    data.push([wallet.address, point, 0]);
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i][1] > 0) {
      data[i][2] = (data[i][1] / totalPoint) * mafiaSupply;
    }
  }
  const wb = Xlsx.utils.book_new();
  const ws = Xlsx.utils.aoa_to_sheet(data);
  Xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
  Xlsx.writeFile(wb, "index.xlsx");
};

export { calculatePoints };
