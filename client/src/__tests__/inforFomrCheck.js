import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PersonalInfo from "../components/PersonalInfo";

Enzyme.configure({ adapter: new Adapter() });

let wrapper;

beforeEach(() => {
  wrapper = shallow(<PersonalInfo />);
});
//call this function before each test cases

test("should render personalInfoPage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});
