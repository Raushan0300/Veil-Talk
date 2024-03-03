import axios from "axios";

// const baseURL = "http://localhost:8000/api";
const baseURL="https://veiltalk-api.vercel.app/api"

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
    throw error;
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
    throw error;
  }
};

const patchData=async(url:any, body:any, customHeader={})=>{
  try{
    const headers={
      ...customHeader,
    };
    const response=await axios.patch(`${baseURL}/${url}`, body, {
      headers:headers,
    });
    const result=response.data;
    return result;
  } catch(error){
    throw error;
  }
}

export { getData, postData, patchData };
