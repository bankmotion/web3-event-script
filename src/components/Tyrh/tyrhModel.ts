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
    if (!tyrhObject.burn) {
      tyrhObject.burn = 0;
    }
    if (!tyrhObject.water) {
      tyrhObject.water = 0;
    }
    if (!tyrhObject.plant) {
      tyrhObject.plant = 0;
    }
    if (!tyrhObject.seed) {
      tyrhObject.seed = 0;
    }
    if (!tyrhObject.holy) {
      tyrhObject.holy = 0;
    }
    if (exist) {
      const updateQuery = `UPDATE tyrh SET 
        liquid = liquid + ?, 
        staking = staking + ?, 
        burn = burn + ?, 
        water = water + ?,
        plant = plant + ?,
        seed = seed + ?,
        holy = holy + ?
        WHERE address = ?`;
      await executeQuery(updateQuery, [
        tyrhObject.liquid,
        tyrhObject.staking,
        tyrhObject.burn,
        tyrhObject.water,
        tyrhObject.plant,
        tyrhObject.seed,
        tyrhObject.holy,
        tyrhObject.address,
      ]);
    } else {
      const createQuery = `INSERT tyrh(liquid, staking, burn, water, plant, seed, holy, address) VALUES(?, ?, ?, ?, ?, ? ,? ,?)`;
      await executeQuery(createQuery, [
        tyrhObject.liquid,
        tyrhObject.staking,
        tyrhObject.burn,
        tyrhObject.water,
        tyrhObject.plant,
        tyrhObject.seed,
        tyrhObject.holy,
        tyrhObject.address,
      ]);
    }
  } catch (err) {
    console.log(`ERROR: tyrhModel ~ ${err}`);
    throw err;
  }
};

export { addOrUpdateTyrh, existAddress };
