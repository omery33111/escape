import axios from "axios";
import { shoeURL } from "../../endpoints/endpoints";
import { Shoe } from "../../models/Shoe";
import { ShoeImage } from "../../models/ShoeImage";



export function getWallShoes()
{
  return new Promise<{ data: Shoe[] }>((resolve) =>
    axios.get(`${shoeURL}/get_wall_shoes/`).then((res) => resolve({ data: res.data })));
}



export function getChosenShoes()
{
  return new Promise<{ data: Shoe[] }>((resolve) =>
    axios.get(`${shoeURL}/get_chosen_shoes/`).then((res) => resolve({ data: res.data })));
}



export function getAllShoes()
{
  return new Promise<{ data: Shoe[] }>((resolve) =>
    axios.get(`${shoeURL}/get_all_shoes/`).then((res) => resolve({ data: res.data })));
}



export function getRandomShoes()
{
  return new Promise<{ data: Shoe[] }>((resolve) =>
    axios.get(`${shoeURL}/get_random_shoes/`).then((res) => resolve({ data: res.data })));
}



export function getSingleShoe(id: string) {
  return new Promise<{ data: Shoe }>((resolve) =>
    axios.get(`${shoeURL}/single_shoe/${id}/`).then((res) => resolve({ data: res.data }))
  );
}



export function postShoeImage(shoeImageData: ShoeImage) {
  return new Promise<{ data: ShoeImage }>((resolve) =>
    axios.post(`${shoeURL}/post_shoe_image/`, shoeImageData).then((res) => resolve({ data: res.data }))
  );
}



export function searchShoe(searchQuery: string)
{
  return new Promise<{ data: Shoe[] }>((resolve) =>
    axios.get(`${shoeURL}/search_shoe/`, { params: { name: searchQuery }}).then((res) => resolve({ data: res.data })));
}
