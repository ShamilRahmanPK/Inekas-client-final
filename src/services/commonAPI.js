import axios from "axios";

const commonAPI = async (httpMethod, url, reqBody, reqHeader) => {
  const reqConfig = {
    method: httpMethod,
    url,
    data: reqBody,
    headers: reqHeader
      ? reqHeader
      : reqBody instanceof FormData
      ? {} // IMPORTANT: let axios set multipart headers
      : { "Content-Type": "application/json" },
  };

  try {
    const res = await axios(reqConfig);
    return res;
  } catch (err) {
    return err.response || err;
  }
};

export default commonAPI;
