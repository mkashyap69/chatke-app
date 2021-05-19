import axios from 'axios';

export const saveMsgsHistory =
  (msgsHistory, roomName, loggedInUser, clickedUser) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: 'SAVE_MSGS_HISTORY_START',
      });
      const { user } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };
      console.log(roomName);
      const { data } = await axios.post(
        '/api/v1/msgs',
        {
          roomName,
          loggedInUser,
          clickedUser,
          msgsHistory,
        },
        config
      );
      dispatch({
        type: 'SAVE_MSGS_HISTORY_SUCCESS',
        payload: data.data.msgsHistory,
      });
    } catch (error) {
      dispatch({
        type: 'SAVE_MSGS_HISTORY_FAILURE',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getMsgHistory = (roomName) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'GET_MSGS_HISTORY_START',
    });

    const { user } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${user.data.token}`,
      },
    };
    const { data } = await axios.get(`/api/v1/msgs/${roomName}`, config);
    dispatch({
      type: 'GET_MSGS_HISTORY_SUCCESS',
      payload: data.data.msgsHistory,
    });
  } catch (error) {
    dispatch({
      type: 'GET_MSGS_HISTORY_FAILURE',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
