import constant from "../../constant";
import { TyrhInterface } from "../Tyrh/tyrhInterface";
import { addOrUpdateTyrh } from "../Tyrh/tyrhModel";

const updateNft = async (address: string, nftType: number) => {
  const tyrhObject: TyrhInterface = {
    address,
    yieldBoosters: nftType === constant.NftType.YieldBoosters ? 1 : 0,
    reduceTime: nftType === constant.NftType.ReduceTime ? 1 : 0,
    lessWater: nftType === constant.NftType.LessWater ? 1 : 0,
    treatment: nftType === constant.NftType.Treatment ? 1 : 0,
    rhWakllet: nftType === constant.NftType.RhWakllet ? 1 : 0,
    leagueBoosters: nftType === constant.NftType.LeagueBoosters ? 1 : 0,
    claimBoosters: nftType === constant.NftType.ClaimBoosters ? 1 : 0,
  };
  console.log(tyrhObject);
  await addOrUpdateTyrh(tyrhObject);
};

export { updateNft };
