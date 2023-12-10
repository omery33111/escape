import axios from 'axios';
import { Shoe } from '../../models/Shoe';
import { administratorURL, brandURL } from '../../endpoints/endpoints';
import { Brand } from '../../models/Brand';



export function getPagedShoes(page: number) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
    return new Promise<{ data: Shoe[] }>((resolve) =>
      axios.get(`${administratorURL}/get_paged_shoes/${page}/`, config).then((res) => resolve({ data: res.data })
      )
    );
}
  
  
  
export function getShoesAmount() {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
    return new Promise<{ data: number }>((resolve =>
        axios.get(`${administratorURL}/shoes_amount/`, config).then(res => resolve({ data: res.data })
        )
    ))
}



export function deleteShoe(id: number) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
    return new Promise<{ data: Shoe }>((resolve) =>
      axios.delete(`${administratorURL}/delete_shoe/${id}/`, config).then((res) => resolve({ data: res.data }))
    );
}



export function postShoe(shoeData: Shoe) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
    const accessToken = myToken ? myToken.access : "";
    let config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
  return new Promise<{ data: Shoe }>((resolve) =>
    axios.post(`${administratorURL}/post_shoe/`, shoeData, config).then((res) => resolve({ data: res.data }))
  );
}



export function putShoe(shoeData: Shoe, id: number) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Shoe }>((resolve) =>
    axios.put(`${administratorURL}/update_shoe/${id}/`, shoeData, config).then((res) => resolve({ data: res.data }))
  );
}



export function getPagedBrands(page: number) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Brand[] }>((resolve) =>
    axios.get(`${administratorURL}/get_paged_brands/${page}/`, config).then((res) => resolve({ data: res.data })
    )
  );
}



export function getBrandsAmount() {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: number }>((resolve =>
      axios.get(`${administratorURL}/brands_amount/`, config).then(res => resolve({ data: res.data })
      )
  ))
}



export function deleteBrand(id: number) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Brand }>((resolve) =>
    axios.delete(`${administratorURL}/delete_brand/${id}/`, config).then((res) => resolve({ data: res.data }))
  );
}



export function postBrand(brandData: Brand) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
    const accessToken = myToken ? myToken.access : "";
    let config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
  return new Promise<{ data: Brand }>((resolve) =>
    axios.post(`${administratorURL}/post_brand/`, brandData, config).then((res) => resolve({ data: res.data }))
  );
}



export function putBrand(brandData: Brand, id: number) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Brand }>((resolve) =>
    axios.put(`${administratorURL}/update_brand/${id}/`, brandData, config).then((res) => resolve({ data: res.data }))
  );
}
