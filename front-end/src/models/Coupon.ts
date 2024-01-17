


export interface Coupon {
    id: number,
    name: string;
    discount: number;
}



export interface CouponState {
    coupons: Coupon[]

    singleCoupon: Coupon
};
