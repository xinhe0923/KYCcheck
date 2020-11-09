import express, { Application, Request, Response, NextFunction } from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { Authorization } from "../config/config";
// import { Customer } from "./types/customer";

var jsonParser = bodyParser.json();
const app: Application = express();
const url: string =
  "https://australia-southeast1-reporting-290bc.cloudfunctions.net/driverlicence";
const headers = {
  "Content-Type": "application/json",
  Authorization: Authorization,
};

function isValidDate(dateString: string) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false; // Invalid format
  var d = new Date(dateString);
  var dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0, 10) === dateString;
}

function isValidState(state: string) {
  const requiredState = ["NSW", "QLD", "SA", "TAS", "VIC", "WA", "ACT", "NT"];
  return requiredState.includes(state);
}

//use middleware to deal with CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.post("/check/", jsonParser, (req: Request, res: Response) => {
  const { birthDate, expiryDate, stateOfIssue } = req.body;
  const dateValid =
    isValidDate(birthDate) && (expiryDate ? isValidDate(expiryDate) : true);
  const validState = isValidState(stateOfIssue);
  if (!dateValid) {
    res.status(400).send("Invalid date format, should be: YYYY-MM-DD ");
  } else if (!validState) {
    res
      .status(400)
      .send(
        "Invalid state, should be one of NSW, QLD, SA, TAS, VIC, WA, ACT, NT "
      );
  } else {
    axios.post(url, req.body, { headers: headers }).then((data) => {
      res.status(200).send(data.data);
    });
  }
});

app.listen(5000, () => {
  console.log("server running");
});
