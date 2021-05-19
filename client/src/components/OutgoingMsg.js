import React from 'react';
import { useSelector } from 'react-redux';

function OutgoingMsg({ msg }) {
  const loggedInUser = useSelector((state) => state.user.data.data.user);

  return (
    <>
      {loggedInUser.userId !== msg.user ? null : (
        <div className="outgoing" key={Math.random()}>
          <div key={Math.random()} className="bubble">
            <span className="msg_sender">
              {loggedInUser.userId === msg.user ? 'You' : loggedInUser.name}
            </span>
            <div className="msg_part">{msg.message}</div>
            <span className="message-time">{msg.current_time}</span>
          </div>
        </div>
      )}
    </>
  );
}

export default OutgoingMsg;
