import { combineReducers } from 'redux';
import { friendsChattedWithReducer } from './friendsChattedWithReducer';
import { msgsReducer } from './msgsReducers';
import {
  getClickedUserReducer,
  getUserReducer,
  userReducer,
} from './userReducers';

export default combineReducers({
  user: userReducer,
  searchedUser: getUserReducer,
  clickedUser: getClickedUserReducer,
  msgsHistory: msgsReducer,
  recentFriendsList: friendsChattedWithReducer,
});
