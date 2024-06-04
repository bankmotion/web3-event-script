import express, { Request, Response } from "express";

import eventMonitorStart from "./startup/events";

const app = express();
const port = 3000;

eventMonitorStart();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
