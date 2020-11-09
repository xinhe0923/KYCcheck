import express, { Application, Request, Response, NextFunction } from "express";
import axios from "axios";
import bodyParser from "body-parser";

var jsonParser = bodyParser.json();
const app: Application = express();
const url: string =
  "https://australia-southeast1-reporting-290bc.cloudfunctions.net/driverlicence";
const headers = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer 03aa7ba718da920e0ea362c876505c6df32197940669c5b150711b03650a78cf",
};
interface requestData {
  birthDate: string;
  givenName: string;
  middleName: string;
  familyName: string;
  licenceNumber: string;
  stateOfIssue: string;
  expiryDate: string;
}
interface respondData {
  verificationResultCode: string;
}

app.get("/hello", (req: Request, res: Response) => {
  res.send("hello");
});

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
