import axios from 'axios';

let coreHost = 'http://127.0.0.1:5000';

if (process.env.NODE_ENV === 'production') {
  coreHost = '138.68.75.213:5000';
}

export const requestCore = async ({route, method, payload}) => {
  const requestUrl = `${coreHost}${route}`;

  if(method === 'get') {
    try {
      const response = await axios.get(requestUrl);
      return response.data;
    } catch(e) {
      console.log('Error: ', e);
      throw new Error("Error in request to core service: ", e);
    }
  } else if(method === 'post') {
    try {
      const response = await axios.post(requestUrl, payload);
      return response.data;
    } catch(e) {
      console.log('Error: ', e);
      throw new Error("Error in request to core service: ", e);
    }   
  }
};
