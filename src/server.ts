import express, { Application, Request, Response, NextFunction } from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { Authorization } from "../config/config";

var jsonParser = bodyParser.json();
const app: Application = express();
const url: string =
  "https://australia-southeast1-reporting-290bc.cloudfunctions.net/driverlicence";
const headers = {
  "Content-Type": "application/json",
  Authorization: Authorization,
};

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.post("/check/", jsonParser, (req: Request, res: Response) => {
  axios.post(url, req.body, { headers: headers }).then((data) => {
    res.status(200).send(data.data);
  });
});

app.listen(5000, () => {
  console.log("server running");
});
