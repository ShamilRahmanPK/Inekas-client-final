import commonAPI from "./commonAPI";
import SERVER_BASE_URL from "./serverUrl";



// add post 
export const addStandardPrintApi = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/postOrder`,reqBody,reqHeader)
}

export const getAllOrdersApi = async (reqBody,reqHeader) => {
    return await commonAPI("GET",`${SERVER_BASE_URL}/allOrders`,reqBody,reqHeader)
}

// update order api
export const updateOrderStatusApi = async (orderId, body) => {
  return await commonAPI(
    "POST",
    `${SERVER_BASE_URL}/updateOrderStatus/${orderId}`,
    body
  );
}
