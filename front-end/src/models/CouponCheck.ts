


export interface CouponCheck {
    id: string,
    exists: boolean;
    discount: number;
}



export interface CouponCheckState {
    checked: CouponCheck
};
