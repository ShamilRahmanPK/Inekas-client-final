// import axios from "axios";

// const commonAPI = async (httpMethod, url, reqBody, reqHeader) => {
//   const reqConfig = {
//     method: httpMethod,
//     url,
//     data: reqBody,
//     headers: reqHeader
//       ? reqHeader
//       : reqBody instanceof FormData
//       ? {} // IMPORTANT: let axios set multipart headers
//       : { "Content-Type": "application/json" },
//   };

//   try {
//     const res = await axios(reqConfig);
//     return res;
//   } catch (err) {
//     return err.response || err;
//   }
// };

// export default commonAPI;


import axios from "axios";

const commonAPI = async (httpMethod, url, reqBody, reqHeader) => {
  const reqConfig = {
    method: httpMethod,
    url,
    data: reqBody,
    timeout: 60000, //  IMPORTANT: handle Render cold start
    headers: reqHeader
      ? reqHeader
      : reqBody instanceof FormData
      ? {} // Let axios auto-set multipart boundary
      : { "Content-Type": "application/json" },
  };

  try {
    const res = await axios(reqConfig);
    return res;
  } catch (err) {
    // ⛑️ Normalize timeout & server errors
    if (err.code === "ECONNABORTED") {
      return {
        status: 408,
        data: {
          message: "Server is waking up. Please try again in a moment.",
        },
      };
    }

    return err.response || {
      status: 500,
      data: { message: "Unexpected error occurred" },
    };
  }
};

export default commonAPI;

