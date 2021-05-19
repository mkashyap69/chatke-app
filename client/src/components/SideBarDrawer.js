import React, { useEffect } from 'react';

import FriendsBar from './FriendsBar';
import ProfileBar from './ProfileBar';
import SearchBar from './SearchBar';

import { Divider } from '@chakra-ui/layout';
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Tooltip,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

function SideBarDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  useEffect(() => {
    btnRef.current.focus();
  }, []);

  return (
    <div className="side-bar">
      <div className="side-bar--button">
        <Button
          ref={btnRef}
          colorScheme="teal"
          onClick={onOpen}
          isFullWidth={true}
          variant="ghost"
          size="xs"
        >
          <Tooltip
            label="Search Friends"
            bg="white"
            fontSize="md"
            color="black"
            defaultIsOpen
          >
            <Search2Icon boxSize={4} />
          </Tooltip>
        </Button>
      </div>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
        closeOnEsc={true}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <ProfileBar />
            <Divider />

            <SearchBar />

            <FriendsBar onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default SideBarDrawer;
