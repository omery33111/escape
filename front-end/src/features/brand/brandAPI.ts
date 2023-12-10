import axios from "axios";
import { brandURL } from "../../endpoints/endpoints";
import { Brand } from "../../models/Brand";
import { Shoe } from "../../models/Shoe";



export function getAllBrands()
{
  return new Promise<{ data: Brand[] }>((resolve) =>
    axios.get(`${brandURL}/get_all_brands/`).then((res) => resolve({ data: res.data })));
}



export function getBrandShoes(id: string) {
  return new Promise<{ data: Shoe[] }>((resolve) =>
    axios.get(`${brandURL}/brand_shoes/${id}/`).then((res) => resolve({ data: res.data }))
  );
}



export function getSingleBrand(id: string) {
  return new Promise<{ data: Brand }>((resolve) =>
    axios.get(`${brandURL}/single_brand/${id}/`).then((res) => resolve({ data: res.data }))
  );
}



export function getPagedShoesOfBrand(id: string, page: number, orderBy: number, models: string) {
  return new Promise<{ data: Shoe[] }>((resolve) =>
    axios.get(`${brandURL}/brand_shoes/${id}/${page}/${orderBy}/${models}/`).then((res) =>
      resolve({ data: res.data })
    )
  );
}



export function getShoesAmountOfBrand(id: string) {
  return new Promise<{ data: number }>((resolve =>
      axios.get(`${brandURL}/brand_shoes_amount/${id}/`).then(res => resolve({ data: res.data }))))}


