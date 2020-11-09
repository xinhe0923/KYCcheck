import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PersonalInfo from "../components/PersonalInfo";

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
const testCase = {
  birthDate: "1985-02-08",
  givenName: "James",
  familyName: "Smith",
  licenceNumber: "94977000",
  stateOfIssue: "NSW",
  expiryDate: "2020-01-01",
  middleName: "Robert",
};
beforeEach(() => {
  wrapper = shallow(<PersonalInfo />);
});
//call this function before each test cases

test("should render personalInfoPage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});
