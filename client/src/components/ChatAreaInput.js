import React from 'react';
import { IoMdArrowDroprightCircle } from 'react-icons/io';

function ChatAreaInput(props) {
  return (
    <div className="chat-area--inputArea">
      <input
        type="text"
        value={props.msg}
        placeholder="Type a message..."
        className="chat-area--input"
        onChange={props.onChange}
      />
      <button
        onClick={props.onSend}
        type="submit"
        className="chat-area--button"
      >
        <IoMdArrowDroprightCircle className="chat-area--buttonIcon" />
      </button>
    </div>
  );
}

export default ChatAreaInput;
