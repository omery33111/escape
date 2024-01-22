import { Address } from "./Shipping";



export interface ProfileManager {
  id: number;
  shipping_address: Address[];
  date: string;
}

export interface ProfileManagerState {
  profilesManager: ProfileManager[];
}