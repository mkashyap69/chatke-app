import React from 'react';
import {Avatar} from '@chakra-ui/react'

function Friends({name,lastMessage}) {
  return (
    <div className="friends-bar-single">
      <Avatar name={name}/>
      <div className="friends-bar-single--text">
        <span className="friends-bar-single--textName">{name}</span>
        <span>{lastMessage}</span>
      </div>
    </div>
  );
}

export default Friends;
