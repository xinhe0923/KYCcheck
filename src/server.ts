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

//use middleware to deal with CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.post("/check/", jsonParser, (req: Request, res: Response) => {
  const dateValid =
    isValidDate(req.body.birthDate) &&
    (req.body.expiryDate ? isValidDate(req.body.expiryDate) : true);
  if (!dateValid) {
    res
      .status(400)
      // .json({
      //   error: { msg: "date not valid, the format should be'YYYY-MM-DD'" },
      // });
      .send('date not valid, the format should be"YYYY-MM-DD" ');
  } else {
    axios.post(url, req.body, { headers: headers }).then((data) => {
      res.status(200).send(data.data);
    });
  }
});

app.listen(5000, () => {
  console.log("server running");
});
