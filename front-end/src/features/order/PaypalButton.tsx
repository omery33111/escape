import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCart } from "../cart/cartSlice";
import { selectCouponCheck } from "../coupon/couponSlice";
import { getAddressesAsync, initGuestAddresses, selectAddress, selectGuestAddresses } from "../shipping/shippingSlice";
import { postOrderAsync, selectSavedCoupon, selectSavedNote, selectSavedTotal } from "./orderSlice";


const PaypalButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const myCart = useAppSelector(selectCart);

    const myTotal = useAppSelector(selectSavedTotal);

    const address = useAppSelector(selectAddress);

    const storedIsLogged = JSON.parse(localStorage.getItem('token') as string);

    const storedAddress = JSON.parse(localStorage.getItem('addresses') as string);

    const guestAddress = useAppSelector(selectGuestAddresses);

    useEffect(() => {
      if (storedIsLogged === true) {
        dispatch(getAddressesAsync());
      }
  
      dispatch(initGuestAddresses());
  
    }, [dispatch, storedIsLogged, storedAddress && storedAddress.length]);

    const savedCoupon = useAppSelector(selectSavedCoupon);
    const savedNote = useAppSelector(selectSavedNote);

    const onApprove = async (data: any, action: any) => {
      return action.order?.capture().then((details: any) => {
      
      const tempTotal = myCart.reduce((accumulator: any, item: any) => {
        return accumulator + item.amount * item.price;
      }, 0);

      const orderDetails = myCart.map((item: any) => ({
        shoe: Number(item.id),
        size: item.size,
        amount: item.amount,
        price: Number(item.price * item.amount),
        note: savedNote,
        coupon: savedCoupon,
      }));
    
      const orderData = storedIsLogged ? { shipping_address: address[0]?.id } : { shipping_address: String(guestAddress[0]?.id) };
  
      dispatch(postOrderAsync({ orderData, orderDetails }));

      navigate('/thankspage')
      })
    };
  
    const initialOptions = {
      clientId: "AbWcNgNxHACE4xkwEw-L2BhfPD1_nbDWAb6zcgxvSi0OOMSZvtvfYtl8ocgahJaCcYEH6kV5DeztDBt1",
      currency: "ILS",
      intent: "capture",
    };

    const couponCheck = useAppSelector(selectCouponCheck);

    const discountedTotal = (myTotal - (myTotal * (couponCheck.discount / 100))).toFixed(2);

    return (
      <div>
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: { value: String(discountedTotal) },
                  },
                ],
              });
            }}
            onApprove={onApprove}
            onError={(error) => {
              console.error("PayPal error:", error);
              toast.error("There was an error with the payment, try again.");
            }}
            onCancel={() => {
              toast.error("Transaction has been cancelled.");
            }}
          />
        </PayPalScriptProvider>
      </div>
    );
  };
  
  export default PaypalButton;