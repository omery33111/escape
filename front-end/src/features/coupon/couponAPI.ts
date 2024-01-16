import axios from "axios";
import { couponURL, profileURL } from "../../endpoints/endpoints";
import Profile from "../../models/Profile";
import { CouponCheck } from "../../models/CouponCheck";



export function checkCoupon(coupon: string) {
  return new Promise<{ data: CouponCheck }>((resolve =>
      axios.get(`${couponURL}/check_coupon/${coupon}/`).then(res => resolve({ data: res.data }))))}
