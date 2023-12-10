import axios from "axios";
import { shoeURL } from "../../endpoints/endpoints";
import { wishList } from "../../models/WishList";



export function getWishList()
{
  return new Promise<{ data: wishList[] }>((resolve) =>
    axios.get(shoeURL).then((res) => resolve({ data: res.data })));
}
