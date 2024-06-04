import executeQuery from "../../db";
import { TyrhInterface } from "./tyrhInterface";

const existAddress = async (address: string) => {
  try {
    const addressExistQuery = `SELECT * FROM tyrh WHERE address = ?`;
    const { rows } = await executeQuery(addressExistQuery, [address]);
    if (rows.length > 0) return true;
    return false;
  } catch (err) {
    console.log(`ERROR: tyrhModel ~ ${err}`);
    throw err;
  }
};

const addOrUpdateTyrh = async (tyrhObject: TyrhInterface) => {
  try {
    const exist = await existAddress(tyrhObject.address);
    if (!tyrhObject.liquid) {
      tyrhObject.liquid = 0;
    }
    if (!tyrhObject.staking) {
      tyrhObject.staking = 0;
    }
    if (exist) {
      const updateQuery = `UPDATE tyrh SET liquid = liquid + ?, staking = staking + ? WHERE address = ?`;
      await executeQuery(updateQuery, [
        tyrhObject.liquid,
        tyrhObject.staking,
        tyrhObject.address,
      ]);
    } else {
      const createQuery = `INSERT tyrh(liquid, staking, address) VALUES(?, ?, ?)`;
      await executeQuery(createQuery, [
        tyrhObject.liquid,
        tyrhObject.staking,
        tyrhObject.address,
      ]);
    }
  } catch (err) {
    console.log(`ERROR: tyrhModel ~ ${err}`);
    throw err;
  }
};

export { addOrUpdateTyrh, existAddress };
