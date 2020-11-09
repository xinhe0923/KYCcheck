import React, { useState } from "react";
import axios from "axios";

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
  const [checkResult, setCheckResult] = useState("");
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
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
        alert("Ture");

        setCheckResult("True");
      } else if (resultCode === "N") {
        alert("false");

        setCheckResult("false");
      } else {
        alert("document");
        setCheckResult("Document Error");
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
