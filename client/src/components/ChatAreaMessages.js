import React, { useRef, useEffect } from 'react';
import IncomingMsg from './IncomingMsg';
import OutgoingMsg from './OutgoingMsg';

function ChatAreaMessages({ msgs }) {
  const divRef = useRef();
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);
  return (
    <div className="chat-area--messages">
      {msgs.map((msg) => {
        return msg.outgoing === true ? (
          <OutgoingMsg key={Math.random()} msg={msg} />
        ) : (
          <IncomingMsg key={Math.random()} msg={msg} />
        );
      })}
      <div ref={divRef} />
    </div>
  );
}

export default ChatAreaMessages;

//<div ref={divRef} />
//<IncomingMsg msgs={props.incomingMsgsHistory} />
//     <OutgoingMsg msgs={props.outgoingMsgsHistory} />

//const divRef = useRef();

//  useEffect(() => {
//    divRef.current.scrollIntoView({ behavior: 'smooth' });
// }, []);
