const initialState = {
  data: null,
  loading: false,
  error: null,
};

const networkReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_DONE_NETWORK_STATUS':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'REQUEST_SUCCESS_NETWORK_STATUS':
      return {
        data: action.payload,
        loading: false,
        error: null,
      };
    case 'REQUEST_FAILED_NETWORK_STATUS':
      return {
        data: null,
        loading: false,
        error: data.payload,
      };
    default:
      return state;
  }
};

export default networkReducer;
