import React from "react";
import "./Button.css";

import { SearchListButton } from "./SearchListButton";

export default {
  title: "components/SearchListButton",
  component: SearchListButton,
};

/*export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};
*/

const exampleObject = {
  _id: 1,
  name: {
    de: "Datteln",
  },
};

export const defaultSearchButton = () => (
  <SearchListButton onClick={() => {}} item={exampleObject}></SearchListButton>
);
