import constant from "../../constant";
import { TyrhInterface } from "../Tyrh/tyrhInterface";
import { addOrUpdateTyrh } from "../Tyrh/tyrhModel";

const updateOgNft = async (address: string) => {
  const tyrhObject: TyrhInterface = {
    address,
    ogNft: 1,
  };
  console.log(tyrhObject);
  await addOrUpdateTyrh(tyrhObject);
};

export { updateOgNft };
