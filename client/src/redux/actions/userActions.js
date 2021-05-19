import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'USER_LOGIN_START',
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/v1/users/login',
      { email, password },
      config
    );

    dispatch({
      type: 'USER_LOGIN_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'USER_LOGIN_FAILURE',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signup = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: 'USER_SIGNUP_START',
    });

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/v1/users/signup', userData, config);

    dispatch({
      type: 'USER_SIGNUP_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'USER_SIGNUP_FAILURE',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserByUserId = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'GET_USER_START',
    });

    // cancelToken and source declaration

    let source = axios.CancelToken.source();

    // save the new request for cancellation

    const { user } = getState();

    const config = {
      cancelToken: source.token,
      headers: {
        Authorization: `Bearer ${user.data.token}`,
      },
    };

    const { data } = await axios.get(`/api/v1/users/${userId}`, config);
    source && source.cancel('Operation canceled due to new request.');
    dispatch({
      type: 'GET_USER_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_USER_FAILURE',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const ClickedUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'GET_CLICKED_USER_START',
    });

    dispatch({
      type: 'GET_CLICKED_USER_SUCCESS',
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: 'GET_CLICKED_USER_FAILURE',
      payload: 'Error',
    });
  }
};

export const removeClickedUser = () => (dispatch) => {
  console.log('hi');
  try {
    dispatch({
      type: 'REMOVE_CLICKED_USER_START',
    });

    dispatch({
      type: 'REMOVE_CLICKED_USER_SUCCESS',
    });
  } catch (error) {
    dispatch({
      type: 'REMOVE_CLICKED_USER_FAILURE',
      payload: 'Error',
    });
  }
};

export const logout = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'LOGOUT_START',
    });

    dispatch({
      type: 'LOGOUT_SUCCESS',
    });
  } catch (error) {
    dispatch({
      type: 'LOGOUT_FAILURE',
    });
  }
};
