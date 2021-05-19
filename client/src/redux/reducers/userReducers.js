const initialState = {};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGIN_START':
      return { ...state, loading: true, error: '' };

    case 'USER_LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'USER_LOGIN_SUCCESS':
      return { ...state, loading: false, data: action.payload };

    case 'USER_SIGNUP_START':
      return { ...state, loading: true, error: '' };

    case 'USER_SIGNUP_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'USER_SIGNUP_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'LOGOUT_START':
      return { ...state, loading: true, error: '' };

    case 'LOGOUT_FAILURE':
      return { ...state, loading: false, error: 'Logout failure' };

    case 'LOGOUT_SUCCESS':
      return { ...state, loading: false, data: null };

    default:
      return state;
  }
};

export const getUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_START':
      return { ...state, loading: true, error: '' };

    case 'GET_USER_FAILURE':
      return { ...state, loading: false, error: action.payload, user: null };

    case 'GET_USER_SUCCESS':
      return { ...state, loading: false, user: action.payload };
    default:
      return state;
  }
};
export const getClickedUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CLICKED_USER_START':
      return { ...state, loading: true, error: '' };

    case 'GET_CLICKED_USER_FAILURE':
      return { ...state, loading: false, error: action.payload, user: null };

    case 'GET_CLICKED_USER_SUCCESS':
      return { ...state, loading: false, user: action.payload };
    case 'REMOVE_CLICKED_USER_START':
      return { ...state, loading: true, error: '' };

    case 'REMOVE_CLICKED_USER_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'REMOVE_CLICKED_USER_SUCCESS':
      return { ...state, loading: false, user: '' };
    default:
      return state;
  }
};
