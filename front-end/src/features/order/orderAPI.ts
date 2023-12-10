import axios, { AxiosRequestConfig } from "axios";
import { orderURL } from "../../endpoints/endpoints";
import { Order } from "../../models/Order";




export function postOrder(orderData: any, orderDetails: { product: number, amount: number, price: number }[]) {

  const data = {
    orderData: orderData,
    orderDetails: orderDetails
  };

  return new Promise<{ data: any }>((resolve) =>
    axios.post(`${orderURL}/order_post/`, data)
      .then((res) => resolve({ data: res.data }))
  );
}



// export function getOrdersUser() {
//   const myToken = JSON.parse(localStorage.getItem("token") as string)
//   const accessToken = myToken ? myToken.access : "";
//   let config = {
//       headers: { 'Authorization': `Bearer ${accessToken}` }
//     }
//   return new Promise<{ data: Order[] }>((resolve =>
//       axios.get(`${orderURL}/orders_peruser/`, config)
//       .then(res => {
//           const orders = res.data.map((order: Order) => ({
//               ...order,
//               picture: order.product.picture,
//               product_name: order.product.product_name,
//               description: order.product.description
//           }));
//           resolve({ data: orders });
//       })));
// }

export function getOrdersUser() {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Order[] }>((resolve =>
      axios.get(`${orderURL}/orders_peruser/`, config).then(res => resolve({ data: res.data }))))}

      

export function getOrders() {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Order[] }>((resolve =>
      axios.get(`${orderURL}/get_orders/`, config).then(res => resolve({ data: res.data }))))}
