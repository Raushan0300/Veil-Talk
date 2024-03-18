import axios from "axios";

// const baseURL = "http://localhost:8000/api";
// const baseURL = "https://veiltalk-api.vercel.app/api";
// const baseURL="https://veil-talk-backend.onrender.com/api";
const baseURL = "https://veiltalk-api.up.railway.app/api";

const getData = async (url: any, customHeader = {}) => {
  try {
    const headers = {
      ...customHeader,
    };
    const response = await axios.get(`${baseURL}/${url}`, {
      headers: headers,
    });
    const result = response.data;
    return result;
  } catch (error) {
    return error;
  }
};

const postData = async (url: any, body: any, customHeader = {}) => {
  try {
    const headers = {
      ...customHeader,
    };
    const response = await axios.post(`${baseURL}/${url}`, body, {
      headers: headers,
    });
    const result = response.data;
    return result;
  } catch (error) {
    return error;
  }
};

const patchData = async (url: any, body: any, customHeader = {}) => {
  try {
    const headers = {
      ...customHeader,
    };
    const response = await axios.patch(`${baseURL}/${url}`, body, {
      headers: headers,
    });
    const result = response.data;
    return result;
  } catch (error) {
    return error;
  }
};

export { getData, postData, patchData };
