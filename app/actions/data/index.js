import {requestCore} from './../../utils';

export const getTokenRequest = (txID) => {
  return requestData({
    dataName: 'TOKENS',
    route: '/token',
    method: 'post',
    payload: {
      tx_id: txID
    }
  });
}

export const getBlockchainStatusRequest = () => {
  return requestData({
    dataName: 'BLOCKCHAIN_STATUS',
    route: '/blockchain_status',
    method: 'get',
  });
};

export const getNetworkStatusRequest = () => {
  return requestData({
    dataName: 'NETWORK_STATUS',
    route: '/network_status',
    method: 'get',
  });
};

export const requestData = ({dataName, route, method, payload}) => {
  return dispatch => {
    dispatch(dataRequest(dataName));
    return requestCore({route, method, payload})
      .then(response => {
        dispatch(dataRequestSuccess(dataName, response));
      })
      .catch(error => {
        dispatch(dataRequestFailed(dataName, error));
      });
  };
};

export const dataRequest = dataName => {
  return {
    type: `REQUEST_DONE_${dataName}`,
  };
};

export const dataRequestSuccess = (dataName, payload) => {
  return {
    type: `REQUEST_SUCCESS_${dataName}`,
    payload,
  };
};

export const dataRequestFailed = (dataName, payload) => {
  return {
    type: `REQUEST_FAILED_${dataName}`,
    payload,
  };
};
