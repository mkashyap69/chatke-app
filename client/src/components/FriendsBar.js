/* eslint-disable react-hooks/exhaustive-deps */
import { Divider } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import Friends from './Friends';
import { useSelector, useDispatch } from 'react-redux';
import { ClickedUser } from '../redux/actions/userActions';
import { getMsgHistory } from '../redux/actions/msgsActions';
import {
  getRecentFriendsList,
  addToRecentFriendsList,
} from '../redux/actions/friendsListAction';

function FriendsBar({ onClose }) {
  const searchedUser = useSelector((state) => state.searchedUser?.user);
  const clickedUser = useSelector((state) => state.clickedUser.user);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.data.data.user);
  const recentFriendsList = useSelector(
    (state) => state.recentFriendsList?.data?.data?.recentlyClickedUsers
  );
  const [roomName, setRoomName] = useState(null);

  useEffect(() => {
    dispatch(getRecentFriendsList());

    if (clickedUser) {
      dispatch(addToRecentFriendsList(clickedUser));
    }
  }, [clickedUser]);

  useEffect(() => {
    if (!searchedUser) {
      setUser(null);
    } else {
      setUser(searchedUser.data);
    }
  }, [searchedUser]);

  useEffect(() => {
    if (clickedUser && roomName) {
      dispatch(getMsgHistory(roomName));
    }
  }, [clickedUser, roomName]);

  const onClickHandlerSearch = () => {
    dispatch(ClickedUser(searchedUser.data));
    onClose();
    const loggedInUserUserId = loggedInUser.userId;

    let roomName =
      parseInt(loggedInUserUserId, 36) * parseInt(searchedUser.data.userId, 36);
    setRoomName(roomName);
    setUser(null);
  };

  const onClickHandlerRecent = (recentFriend) => {
    dispatch(ClickedUser(recentFriend));
    onClose();
    const loggedInUserUserId = loggedInUser.userId;

    let roomName =
      parseInt(loggedInUserUserId, 36) * parseInt(recentFriend.userId, 36);
    setRoomName(roomName);
    setUser(null);
  };
  return (
    <div className="friends-bar">
      <div className="friends-bar-single1" onClick={onClickHandlerSearch}>
        <Friends name={user?.name} />
        <Divider />
      </div>

      <>
        <h2 style={{ fontWeight: 'bolder', color: '#79c7c5' }}>Recent Chats</h2>
        {recentFriendsList
          ? recentFriendsList.map((recentFriend) => (
              <div
                className="friends-bar-single1"
                key={recentFriend._id}
                onClick={() => onClickHandlerRecent(recentFriend)}
              >
                <Friends name={recentFriend.name} />
                <Divider />
              </div>
            ))
          : 'No recent chats. Start texting!!!'}
      </>
    </div>
  );
}

export default FriendsBar;
