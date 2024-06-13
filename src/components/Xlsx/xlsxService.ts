import * as Xlsx from "xlsx";
import fs from "fs";
import { getAllAddress } from "../Tyrh/tyrhModel";
import { TyrhInterface } from "../Tyrh/tyrhInterface";

const writeXlsx = async () => {
  const results: TyrhInterface[] = await getAllAddress();

  const workSheet = Xlsx.utils.json_to_sheet(results);
  const workbook = Xlsx.utils.book_new();
  Xlsx.utils.book_append_sheet(workbook, workSheet, "Sheet1");
  Xlsx.writeFile(workbook, "tyrh_total_liquid.xlsx");
  console.log(`Excel file written successfully`);
};

export { writeXlsx };
