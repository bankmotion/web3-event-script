import { BlockInfo } from "./blockInterface";
import { getBlockInfo, updateBlockInfo } from "./blockModel";

const getBlockInfoByName = async ({ name }: { name: string }) => {
  try {
    const result = (await getBlockInfo(name)) as BlockInfo;
    return result;
  } catch (err) {
    throw err;
  }
};

const updateBlockInfoByName = async ({
  name,
  block,
}: {
  name: string;
  block: number;
}) => {
  try {
    await updateBlockInfo(name, block);
  } catch (err) {
    throw err;
  }
};

export { getBlockInfoByName, updateBlockInfoByName };
