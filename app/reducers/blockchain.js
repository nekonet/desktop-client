const initialState = {
  data: {},
  loading: false,
  error: null,
};

const blockchainReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_DONE_BLOCKCHAIN_STATUS':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'REQUEST_SUCCESS_BLOCKCHAIN_STATUS':
      return {
        data: action.payload,
        loading: false,
        error: null,
      };
    case 'REQUEST_FAILED_BLOCKCHAIN_STATUS':
      return {
        data: {},
        loading: false,
        error: data.payload,
      };
    default:
      return state;
  }
};

export default blockchainReducer;
