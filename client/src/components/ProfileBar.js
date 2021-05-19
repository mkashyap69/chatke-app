import { Avatar } from '@chakra-ui/avatar';
import React from 'react';
import { useSelector } from 'react-redux';


function ProfileBar() {
  const user = useSelector((state) => state.user?.data?.data.user);
  
  return (
    <div className="profile-bar">
      <div className="profile-barAvatar">
        <Avatar name={user.name} />
      </div>
      <div className="profile-bar--text">
        <span>{user.name}</span>
      </div>
      
    </div>
  );
}

export default ProfileBar;
