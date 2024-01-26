


export interface CouponCheck {
    id: string,
    exists: boolean;
    discount: number;
    one_time: boolean;
}



export interface CouponCheckState {
    checked: CouponCheck
};
