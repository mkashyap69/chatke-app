import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';

import { HamburgerIcon } from '@chakra-ui/icons';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineLogout } from 'react-icons/ai';

function DropDown() {
  return (
    <Menu placement="left">
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        <MenuItem icon={<CgProfile />}>Profile</MenuItem>
        <MenuItem icon={<AiOutlineLogout />}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
  /*  return (
    <DropdownButton id="basic-nav-dropdown" menuAlign="right">
      <Dropdown.Item>Profile</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item>Logout</Dropdown.Item>
    </DropdownButton>
  ); */
}

export default DropDown;
