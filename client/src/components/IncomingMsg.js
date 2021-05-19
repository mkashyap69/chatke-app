import React from 'react';
import { useSelector } from 'react-redux';

function IncomingMsg({ msg }) {
  const loggedInUser = useSelector((state) => state.user.data.data.user);
  const clickedUser = useSelector((state) => state?.clickedUser?.user);

  return (
    <>
      {loggedInUser.userId === msg.user ? null : (
        <div className="incoming" key={Math.random()}>
          <div key={Math.random()} className="bubble">
            <span className="msg_sender">
              {loggedInUser.userId === msg.user ? 'You' : clickedUser.name}
            </span>
            <div className="msg_part">{msg.message}</div>
            <span className="message-time">{msg.current_time}</span>
          </div>
        </div>
      )}
    </>
  );
}

export default IncomingMsg;
