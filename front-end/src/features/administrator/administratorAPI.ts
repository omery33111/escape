import axios from 'axios';
import { Shoe } from '../../models/Shoe';
import { administratorURL, brandURL } from '../../endpoints/endpoints';
import { Brand } from '../../models/Brand';
import { InstaRec } from '../../models/InstaRec';
import { Order } from '../../models/Order';
import { Coupon } from '../../models/Coupon';
import { ProfileManager } from '../../models/ProfileManager';



export function searchShoe(searchQuery: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  };
  return new Promise<{ data: Shoe[] }>((resolve) =>
    axios.get(`${administratorURL}/admin_search_shoe/`, { params: { name: searchQuery }, ...config }).then((res) => resolve({ data: res.data })));
}



export function searchProfile(searchQuery: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  };
  return new Promise<{ data: ProfileManager[] }>((resolve) =>
    axios.get(`${administratorURL}/search_profile/`, { params: { username: searchQuery }, ...config }).then((res) => resolve({ data: res.data })));
}



export function getPagedProfilesManager(page: number) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
    return new Promise<{ data: ProfileManager[] }>((resolve) =>
      axios.get(`${administratorURL}/all_profiles/${page}/`, config).then((res) => resolve({ data: res.data })
      )
    );
}

export function getPagedOrders(page: number) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Order[] }>((resolve) =>
    axios.get(`${administratorURL}/get_paged_orders/${page}/`, config).then((res) => resolve({ data: res.data })
    )
  );
}

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


export function getBlacklistedShoes(page: number) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
    return new Promise<{ data: Shoe[] }>((resolve) =>
      axios.get(`${administratorURL}/get_blacklisted_shoes/${page}/`, config).then((res) => resolve({ data: res.data })
      )
    );
}



export function getSingleCoupon(id: number) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
  }
  return new Promise<{ data: Coupon }>((resolve) =>
    axios.get(`${administratorURL}/single_coupon/${id}/`, config).then((res) => resolve({ data: res.data }))
  );
}



export function getPagedInstaRecs(page: number) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
    return new Promise<{ data: InstaRec[] }>((resolve) =>
      axios.get(`${administratorURL}/get_paged_insta_recs/${page}/`, config).then((res) => resolve({ data: res.data })
      )
    );
}
  
  
  
export function isUserStaff() {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
    return new Promise<{ data: boolean }>((resolve =>
        axios.get(`${administratorURL}/is_user_staff/`, config).then(res => resolve({ data: res.data })
        )
    ))
}
  
  
  
export function getProfilesAmount() {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
    return new Promise<{ data: number }>((resolve =>
        axios.get(`${administratorURL}/profiles_amount/`, config).then(res => resolve({ data: res.data })
        )
    ))
}
  
  
  
export function shoesBlacklistedAmount() {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
    return new Promise<{ data: number }>((resolve =>
        axios.get(`${administratorURL}/shoes_blacklist_amount/`, config).then(res => resolve({ data: res.data })
        )
    ))
}
  
  
  
export function getInstaRecAmount() {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
    return new Promise<{ data: number }>((resolve =>
        axios.get(`${administratorURL}/instarec_amount/`, config).then(res => resolve({ data: res.data })
        )
    ))
}
  
  
  
export function getCoupons() {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
    return new Promise<{ data: Coupon[] }>((resolve =>
        axios.get(`${administratorURL}/get_coupons/`, config).then(res => resolve({ data: res.data })
        )
    ))
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



export function deleteCoupon(id: number) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
    return new Promise<{ data: Coupon }>((resolve) =>
      axios.delete(`${administratorURL}/delete_coupon/${id}/`, config).then((res) => resolve({ data: res.data }))
    );
}



export function deleteShoe(id: number) {
  const myToken = JSON.parse(localStorage.getItem("token") as string);
  const accessToken = myToken ? myToken.access : "";

  if (!accessToken) {
    return Promise.reject("Access token not available");
  }

  let config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  return new Promise<{ data: Shoe }>((resolve) =>
    axios.put(`${administratorURL}/delete_shoe/${id}/`, null, config).then((res) =>
      resolve({ data: res.data })
    )
  );
}



export function deleteInstaRec(id: number) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
    return new Promise<{ data: InstaRec }>((resolve) =>
      axios.delete(`${administratorURL}/delete_instarec/${id}/`, config).then((res) => resolve({ data: res.data }))
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



export function postCoupon(couponData: Coupon) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
    const accessToken = myToken ? myToken.access : "";
    let config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
  return new Promise<{ data: Coupon }>((resolve) =>
    axios.post(`${administratorURL}/post_coupon/`, couponData, config).then((res) => resolve({ data: res.data }))
  );
}



export function putCoupon(couponData: Coupon, id: number) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Coupon }>((resolve) =>
    axios.put(`${administratorURL}/update_coupon/${id}/`, couponData, config).then((res) => resolve({ data: res.data }))
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



export function getRecentOrders() {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Order[] }>((resolve) =>
    axios.get(`${administratorURL}/recent_orders/`, config).then((res) => resolve({ data: res.data })
    )
  );
}



export function getUserOrders(id: number) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Order[] }>((resolve) =>
    axios.get(`${administratorURL}/orders_peruser/${id}/`, config).then((res) => resolve({ data: res.data })
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



export function getOrdersAmount() {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: number }>((resolve =>
      axios.get(`${administratorURL}/orders_amount/`, config).then(res => resolve({ data: res.data })
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



export function postInstaRec(recData: InstaRec) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
    const accessToken = myToken ? myToken.access : "";
    let config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
  return new Promise<{ data: InstaRec }>((resolve) =>
    axios.post(`${administratorURL}/post_insta_rec/`, recData, config).then((res) => resolve({ data: res.data }))
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
