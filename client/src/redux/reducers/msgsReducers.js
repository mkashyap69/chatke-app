export const msgsReducer = (state=[], action) => {
  switch (action.type) {
    case 'SAVE_MSGS_HISTORY_START':
      return { ...state, loading: true, error: null };
    case 'SAVE_MSGS_HISTORY_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'SAVE_MSGS_HISTORY_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'GET_MSGS_HISTORY_START':
      return { ...state, loading: true, error: null };
    case 'GET_MSGS_HISTORY_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'GET_MSGS_HISTORY_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
