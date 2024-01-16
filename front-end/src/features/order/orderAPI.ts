import axios, { AxiosRequestConfig } from "axios";
import { orderURL } from "../../endpoints/endpoints";
import { Order } from "../../models/Order";




export function postOrder(orderData: any, orderDetails: { shoe: number, amount: number, price: number, note: string, coupon: string }[]) {

  const myToken = JSON.parse(localStorage.getItem("token") as string);
  const accessToken = myToken ? myToken.access : "";

  const config: AxiosRequestConfig = {};

  if (accessToken) {
    config.headers = { 'Authorization': `Bearer ${accessToken}` };
  }

  const data = {
    orderData: orderData,
    orderDetails: orderDetails
  };

  return new Promise<{ data: any }>((resolve) =>
    axios.post(`${orderURL}/order_post/`, data, config)
      .then((res) => resolve({ data: res.data }))
  );
}



export function getOrdersUser() {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Order[] }>((resolve =>
      axios.get(`${orderURL}/orders_peruser/`, config).then(res => resolve({ data: res.data }))))}

      

export function getLastMonthOrders() {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Order[] }>((resolve =>
      axios.get(`${orderURL}/user_lastmonth_orders/`, config).then(res => resolve({ data: res.data }))))}

      

export function getUserOrders() {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Order[] }>((resolve =>
      axios.get(`${orderURL}/user_orders/`, config).then(res => resolve({ data: res.data }))))}




// export function getOrders() {
//   const myToken = JSON.parse(localStorage.getItem("token") as string)
//   const accessToken = myToken ? myToken.access : "";
//   let config = {
//       headers: { 'Authorization': `Bearer ${accessToken}` }
//     }
//   return new Promise<{ data: Order[] }>((resolve =>
//       axios.get(`${orderURL}/get_orders/`, config).then(res => resolve({ data: res.data }))))}
