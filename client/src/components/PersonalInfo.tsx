import React, { useState } from "react";
import axios from "axios";

type StringOfLength<Min, Max> = string & {
  __value__: never; // this is the phantom type
};

// This is a type guard function which can be used to assert that a string
// is of type StringOfLength<Min,Max>
const isStringOfLength = <Min extends number, Max extends number>(
  str: string,
  min: Min,
  max: Max
): str is StringOfLength<Min, Max> => str.length >= min && str.length <= max;

// type constructor function
const stringOfLength = <Min extends number, Max extends number>(
  input: string,
  min: Min,
  max: Max
): boolean => {
  if (!isStringOfLength(input, min, max)) {
    alert(`you should input no more than ${max} characters`);
    return false;
  }
  return true; // the type of input here is now StringOfLength<Min,Max>
};

const PersonalInfo: React.FC = () => {
  const [personalInfo, setpersonalInfo] = useState({
    birthDate: "",
    givenName: "",
    familyName: "",
    licenceNumber: "",
    stateOfIssue: "",
    expiryDate: "",
    middleName: "",
  });
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    stringOfLength(e.currentTarget.value, 0, 100);
    setpersonalInfo({
      ...personalInfo,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    axios.post("/check", personalInfo).then((res) => {
      const resultCode = res.data.verificationResultCode;
      if (resultCode === "Y") {
        alert("Check result: Ture");
      } else if (resultCode === "N") {
        alert("Check result: False");
      } else {
        alert("Check result: Document Error");
      }
    });
  };
  return (
    <div>
      <form className="info-form" onSubmit={submitHandler}>
        <label>Personal Info</label>
        <p />
        birthDate
        <input
          type="text"
          name="birthDate"
          onChange={(e) => onChange(e)}
          required
        />
        <p />
        givenName
        <input
          type="text"
          name="givenName"
          onChange={(e) => onChange(e)}
          required
        />
        <p />
        familyName
        <input
          type="text"
          name="familyName"
          onChange={(e) => onChange(e)}
          required
        />
        <p />
        licenceNumber
        <input
          type="text"
          name="licenceNumber"
          onChange={(e) => onChange(e)}
          required
        />
        <p />
        stateOfIssue
        <input
          type="text"
          name="stateOfIssue"
          onChange={(e) => onChange(e)}
          required
        />
        <p />
        expiryDate
        <input type="text" name="expiryDate" onChange={(e) => onChange(e)} />
        <p />
        middleName
        <input type="text" name="middleName" onChange={(e) => onChange(e)} />
        <p />
        <button type="submit">check</button>
      </form>
      <p />
      {/* Check result
      {checkResult} */}
    </div>
  );
};

export default PersonalInfo;
