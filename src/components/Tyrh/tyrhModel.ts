import { EventLog } from "web3";
import executeQuery from "../../db";
import { ethers } from "ethers";

const addOrUpdateLiquid = async (address: string, value: number) => {
  try {
    const addressExistQuery = `SELECT * FROM tyrh WHERE address = ?`;
    const { rows } = await executeQuery(addressExistQuery, [address]);
    if (rows.length > 0) {
      const updateQuery = `UPDATE tyrh SET liquid = liquid + ? WHERE address = ?`;
      await executeQuery(updateQuery, [value, address]);
    } else {
      const createQuery = `INSERT tyrh(liquid, address) VALUES(?, ?)`;
      await executeQuery(createQuery, [value, address]);
    }
  } catch (err) {
    console.log(`ERROR: tyrhModel ~ ${err}`);
    throw err;
  }
};

export { addOrUpdateLiquid };
