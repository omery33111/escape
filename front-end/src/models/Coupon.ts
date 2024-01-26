


export interface Coupon {
    id: number,
    name: string;
    discount: number;
    one_time: boolean;
}



export interface CouponState {
    coupons: Coupon[]

    singleCoupon: Coupon
};
