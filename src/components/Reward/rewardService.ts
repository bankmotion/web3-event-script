import * as Xlsx from "xlsx";
import { TyrhInterface } from "../Tyrh/tyrhInterface";
import { getAllAddress } from "../Tyrh/tyrhModel";
import constant from "../../constant";

const calculatePoints = async () => {
  const wallets: TyrhInterface[] = await getAllAddress();
  const data: any = [["address", "point"]];
  for (const wallet of wallets) {
    const point =
      (wallet.liquid ?? 0) * constant.PointsWeight.Tyrh +
      (wallet.stakedTyrh ?? 0) * constant.PointsWeight.StakedTyrh +
      (wallet.burn ?? 0) * constant.PointsWeight.LiquidBurn +
      (wallet.water ?? 0) * constant.PointsWeight.LiquidWater +
      (wallet.plant ?? 0) * constant.PointsWeight.LiquidPlant +
      (wallet.stakedBurn ?? 0) * constant.PointsWeight.StakedBurn +
      (wallet.stakedPlant ?? 0) * constant.PointsWeight.StakedPlant +
      (wallet.stakedWater ?? 0) * constant.PointsWeight.StakedWater;
    data.push([wallet.address, point]);
  }
  const wb = Xlsx.utils.book_new();
  const ws = Xlsx.utils.aoa_to_sheet(data);
  Xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
  Xlsx.writeFile(wb, "index.xlsx");
};

export { calculatePoints };
