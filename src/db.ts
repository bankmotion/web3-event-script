var mysql = require("mysql");
import { config } from "dotenv";

config();

const dbConf = {
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  port: parseInt(process.env.MYSQL_PORT || "3306", 10),
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "",
  connectionLimit: parseInt(process.env.MYSQL_MAX_CONNECTION || "10", 10),
  debug: false,
};

const pool = mysql.createPool(dbConf);

const executeQuery = async (query: string, values: any[]): Promise<any> => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err: Error, connection: any) {
      if (err) {
        console.log(`ERROR: db connect ${err}`);
        return reject(err);
      }
      connection.query(query, values, (err: Error, rows: any) => {
        connection.release();
        if (err) {
          console.log(`ERROR: db query ~ ${err}`);
          return reject(err);
        }
        resolve({ rows });
      });
      // connection.on("error", function (err) {
      //   connection.release();
      //   throw err;
      // });
    });
  });
};

export default executeQuery;
