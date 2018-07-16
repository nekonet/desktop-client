const initialState = {
  tokens: [],
  loading: false,
  error: null,
};

const tokensReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_DONE_TOKENS':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'REQUEST_SUCCESS_TOKENS':
      return {
        tokens: {
          ...state.tokens,
          [action.payload.tx_id]: action.payload,
        },
        loading: false,
        error: null,
      };
    case 'REQUEST_FAILED_TOKENS':
      return {
        ...state,
        loading: false,
        error: data.payload,
      };
    default:
      return state;
  }
};

export default tokensReducer;
