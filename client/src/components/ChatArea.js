/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import ChatProfileBar from './ChatProfileBar';
import ChatAreaMessages from './ChatAreaMessages';
import ChatAreaInput from './ChatAreaInput';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getMsgHistory, saveMsgsHistory } from '../redux/actions/msgsActions';
import { getRecentFriendsList } from '../redux/actions/friendsListAction';

const socket = io('https://whatsapp-socketio-react.herokuapp.com');

function ChatArea({ SideBarDrawer }) {
  const [msg, setMsg] = useState('');
  const [msgsHistory, setMsgsHistory] = useState([]);
  const [roomName, setRoomName] = useState(null);
  const [retrievedMsgsHistoryState, setRetrievedMsgsHistoryState] = useState(
    []
  );
  const dispatch = useDispatch();

  const clickedUser = useSelector((state) => state.clickedUser.user);
  const loggedInUser = useSelector((state) => state.user.data.data.user);
  const retrievedMsgsHistory = useSelector((state) => state.msgsHistory?.data);

  useEffect(() => {
    dispatch(getRecentFriendsList());
  }, []);

  useEffect(() => {
    socket.on('messageToUser', ({ message, user, current_time }) => {
      setMsgsHistory([
        ...msgsHistory,
        { message, user, current_time, outgoing: false },
      ]);
      dispatch(
        saveMsgsHistory(
          { message, user, current_time, outgoing: false },
          roomName,
          loggedInUser?._id,
          clickedUser?._id
        )
      );
    });

    return () => {
      socket.off('messageToUser');
    };
  }, [msgsHistory, roomName]);

  useEffect(() => {
    if (clickedUser && roomName) {
      dispatch(getMsgHistory(roomName));
    }
  }, [clickedUser, roomName, msgsHistory]);

  useEffect(() => {
    setRetrievedMsgsHistoryState(retrievedMsgsHistory);
  }, [retrievedMsgsHistory]);

  useEffect(() => {
    const clickedUserUserId = clickedUser?.userId;
    if (typeof clickedUserUserId === 'undefined') return;
    else {
      const loggedInUserUserId = loggedInUser.userId;

      let roomName =
        parseInt(loggedInUserUserId, 36) * parseInt(clickedUserUserId, 36);
      setRoomName(roomName);
      socket.emit('roomNameToJoin', roomName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedUser]);

  const onSend = (e) => {
    if (msg === '') {
      return;
    }

    let current_time = moment().format('HH:mm');

    setMsgsHistory([
      ...msgsHistory,

      {
        message: msg,
        user: loggedInUser.userId,
        current_time,
        outgoing: true,
      },
    ]);
    dispatch(
      saveMsgsHistory(
        {
          message: msg,
          user: loggedInUser.userId,
          current_time,
          outgoing: true,
        },
        roomName,
        loggedInUser?._id,
        clickedUser?._id
      )
    );
    socket.emit('message', { message: msg, user: loggedInUser.userId });

    setMsg('');
  };

  const onChange = (e) => {
    setMsg(e.target.value);
  };

  return (
    <div className="chat-area">
      <ChatProfileBar user={clickedUser} SideBarDrawer={SideBarDrawer} />
      <ChatAreaMessages
        msgs={retrievedMsgsHistoryState ? retrievedMsgsHistoryState : []}
      />
      <ChatAreaInput onSend={onSend} msg={msg} onChange={onChange} />
    </div>
  );
}

export default ChatArea;

/*
 


if (loggedInUser && clickedUser && retrievedMsgsHistory) {
  let newMsgsHistory = retrievedMsgsHistory.concat(msgsHistory);
  dispatch(
    saveMsgsHistory(newMsgsHistory, loggedInUser?._id, clickedUser?._id)
  );
}*/
