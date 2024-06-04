import executeQuery from "../../db";
import { existAddress } from "../Tyrh/tyrhModel";

const addOrUpdateStaking = async (address: string, value: number) => {
  try {
    const exist = await existAddress(address);
    if (exist) {
      const updateQuery = `UPDATE tyrh SET staking = staking + ? WHERE address = ?`;
      await executeQuery(updateQuery, [value, address]);
    } else {
      const createQuery = `INSERT tyrh(staking, address) VALUES(?, ?)`;
      await executeQuery(createQuery, [value, address]);
    }
  } catch (err) {
    console.log(`ERROR: stakingModel ~ ${err}`);
    throw err;
  }
};

export { addOrUpdateStaking };
