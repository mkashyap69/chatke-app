import React from 'react';
import { Avatar } from '@chakra-ui/avatar';
import { AiOutlineLogout } from 'react-icons/ai';
import { Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { logout, removeClickedUser } from '../redux/actions/userActions';

function ChatProfileBar({ user, SideBarDrawer }) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(removeClickedUser());
    dispatch(logout());
  };
  return (
    <div className="profile-bar--chat">
      <div className="profile-barLeft--chat">
        <SideBarDrawer />
        <div className="profile-barAvatar--chat">
          <Avatar name={user?.name} />
        </div>
        <div className="profile-bar--text">
          <span>{user?.name}</span>
        </div>
      </div>
      <div className="profile-barMenu">
        <Button
          rightIcon={<AiOutlineLogout />}
          colorScheme="teal"
          variant="link"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default ChatProfileBar;
