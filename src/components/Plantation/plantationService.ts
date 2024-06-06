import constant from "../../constant";
import { TyrhInterface } from "../Tyrh/tyrhInterface";
import { addOrUpdateTyrh } from "../Tyrh/tyrhModel";

const updatePlantation = async (infos: number[], address: string) => {
  const tyrhObject: TyrhInterface = {
    address,
    cattails: infos[constant.PlantationNftId.Cattails],
    bush: infos[constant.PlantationNftId.Bush],
    tree: infos[constant.PlantationNftId.Tree],
    pine: infos[constant.PlantationNftId.Pine],
    palm: infos[constant.PlantationNftId.Plam],
    sherman: infos[constant.PlantationNftId.Sherman],
  };
  await addOrUpdateTyrh(tyrhObject);
};

export { updatePlantation };
