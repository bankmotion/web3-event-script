import executeQuery from "../../db";
import { BlockInfo } from "./blockInterface";

const getBlockInfo = async (name: string): Promise<BlockInfo> => {
  let query = `SELECT * from blocks where name = ?`;
  try {
    const result = await executeQuery(query, [name]);
    return result.rows[0] as BlockInfo;
  } catch (err) {
    console.log(`ERROR: BlockInfo/model ~ ${err}`);
    throw err;
  }
};

const updateBlockInfo = async (name: string, block: number) => {
  let query = `UPDATE blocks SET block = ? WHERE name = ?`;
  try {
    await executeQuery(query, [block, name]);
  } catch (err) {
    console.log(`ERROR: BlockInfo/model ~ ${err}`);
    throw err;
  }
};

export { getBlockInfo, updateBlockInfo };
