export const friendsChattedWithReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_FRIENDS_CHATTED_WITH_START':
      return { ...state, loading: true, error: null };
    case 'GET_FRIENDS_CHATTED_WITH_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'GET_FRIENDS_CHATTED_WITH_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_TO_RECENT_START':
      return { ...state, loading: true, error: null };
    case 'ADD_TO_RECENT_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'ADD_TO_RECENT_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
