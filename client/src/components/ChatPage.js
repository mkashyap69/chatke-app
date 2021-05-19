import React from 'react';
import SideBarDrawer from './SideBarDrawer';
import ChatArea from './ChatArea';

const ChatPage = () => {
  return (
    <div className="main">
      <ChatArea SideBarDrawer={SideBarDrawer} />
    </div>
  );
};

export default ChatPage;
