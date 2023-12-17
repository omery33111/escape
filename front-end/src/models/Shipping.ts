export interface Address {
  id?: number;
  first_name: string;
  last_name: string;
  city: string;
  address: string;
  house_number: number;
  phone_number: number;
  postal_code: number;
  user?: number;
}
      
      
export interface AddressState {
  addresses: Address[];
  guestAddress: Address[];
  single_address: Address;

  addressesAmount: number;

  israelCities: string[];
  israelStreets: string[];

  isLoading: boolean;
  isError: boolean;

  searchCity: string;
  searchStreet: string;
};