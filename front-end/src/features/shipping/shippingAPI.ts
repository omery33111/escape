import axios, { AxiosRequestConfig } from "axios";
import { shippingURL } from "../../endpoints/endpoints";
import { Address } from "../../models/Shipping";



export function getAddressesAmount() {
  return new Promise<{ data: number }>((resolve =>
      axios.get(`${shippingURL}/addresses_amount/`).then(res => resolve({ data: res.data }))))}




export function getNextShippingID() {
  return new Promise<{ data: number }>((resolve =>
      axios.get(`${shippingURL}/get_next_shipping_id/`).then(res => resolve({ data: res.data }))))}



export function getAddresses() {
  const myToken = JSON.parse(localStorage.getItem("token") as string);
  const accessToken = myToken ? myToken.access : "";

  const config: AxiosRequestConfig = {};

  if (accessToken) {
    config.headers = { 'Authorization': `Bearer ${accessToken}` };
  }
    return new Promise<{ data: Address[] }>((resolve =>
        axios.get(shippingURL + "/get_shipping/", config).then(res => resolve({ data: res.data }))))}


export function getSingleAddress(id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
    const accessToken = myToken ? myToken.access : "";
    let config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
  return new Promise<{ data: Address }>((resolve) =>
    axios.get(`${shippingURL}/shipping_get/${id}/`, config).then((res) => resolve({ data: res.data }))
  );
}


export function patchAddress(shippingData: Address, id: number) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
    const accessToken = myToken ? myToken.access : "";
    let config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
  return new Promise<{ data: Address }>((resolve) =>
    axios.put(`${shippingURL}/shipping_update/${id}/`, shippingData, config).then((res) => resolve({ data: res.data }))
  );
}



export function postAddress(shippingData: Address) {
  const myToken = JSON.parse(localStorage.getItem("token") as string);
  const accessToken = myToken ? myToken.access : "";

  const config: AxiosRequestConfig = {};

  if (accessToken) {
    config.headers = { 'Authorization': `Bearer ${accessToken}` };
  }
  return new Promise<{ data: Address }>((resolve) =>
    axios.post(`${shippingURL}/post_shipping/`, shippingData, config).then((res) => resolve({ data: res.data }))
  );
}



export const getIsraelStreets = async (query: string) => {
  const resourceID = '9ad3862c-8391-4b2f-84a4-2d4c68625f4b';
  const allStreets: any[] = [];
  let offset = 0;
  const limit = 60627;

  try {
    while (true) {
      const url = `https://data.gov.il/api/3/action/datastore_search?resource_id=${resourceID}&q=${query}&limit=${limit}&offset=${offset}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.result && data.result.records && data.result.records.length > 0) {
        allStreets.push(...data.result.records);
        offset += limit;
      } else {
        break;
      }
    }

    return allStreets;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};



export const getIsraelCities = async (query: string) => {
  const resourceID = '5c78e9fa-c2e2-4771-93ff-7f400a12f7ba';

  try {
    const url = `https://data.gov.il/api/3/action/datastore_search?resource_id=${resourceID}&q=${query}:*&limit=1268`; 
    const response = await fetch(url);
    const data = await response.json();
    
  
      return data.result.records.filter((city: any) => 
        city.שם_ישוב.includes(query)
      );

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; 
  }
}


