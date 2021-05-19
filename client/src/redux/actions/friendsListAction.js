import axios from 'axios';

export const getRecentFriendsList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'GET_FRIENDS_CHATTED_WITH_START',
    });

    const { user } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${user.data.token}`,
      },
    };

    const { data } = await axios.get('/api/v1/friends/', config);

    dispatch({
      type: 'GET_FRIENDS_CHATTED_WITH_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_FRIENDS_CHATTED_WITH_FAILURE',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addToRecentFriendsList =
  (clickedUser) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'ADD_TO_RECENT_START',
      });

      const { user } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };

      const { data } = await axios.post(
        '/api/v1/friends/',
        { clickedUser },
        config
      );

      dispatch({
        type: 'ADD_TO_RECENT_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'ADD_TO_RECENT_FAILURE',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
