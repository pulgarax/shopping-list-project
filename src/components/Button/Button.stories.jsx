import React from 'react';
import './Button.css';

import { SearchListButton } from './SearchListButton';


export default {
  title: 'components/SearchListButton',
  component: SearchListButton
};

/*export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};
*/
export const defaultSearchButton = () => (
    <SearchListButton onClick={()=>{}}>Datteln</SearchListButton>
)