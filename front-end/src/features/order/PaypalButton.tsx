import { PayPalScriptProvider, PayPalButtons, ReactPayPalScriptOptions  } from "@paypal/react-paypal-js";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { selectCart } from "../cart/cartSlice";
import { postOrderAsync, selectSavedAddress, selectSavedCoupon, selectSavedNote, selectSavedTotal } from "./orderSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAddressesAsync, initGuestAddresses, selectAddress } from "../shipping/shippingSlice";
import { selectCouponCheck } from "../coupon/couponSlice";




const PaypalButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const myCart = useAppSelector(selectCart);

    const myTotal = useAppSelector(selectSavedTotal);

    const address = useAppSelector(selectAddress);

    const storedIsLogged = JSON.parse(localStorage.getItem('token') as string);

    const storedAddress = JSON.parse(localStorage.getItem('addresses') as string);

    useEffect(() => {
      if (storedIsLogged === true) {
        dispatch(getAddressesAsync());
      }
  
      if (storedIsLogged === false) {
        dispatch(initGuestAddresses());
      }
  
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
        amount: item.amount,
        price: Number(item.price * item.amount),
        note: savedNote,
        coupon: savedCoupon,
      }));
    
      const orderData = {
        shipping_address: address[0].id,
      };

       dispatch(postOrderAsync({ orderData, orderDetails }));
      })
    };
  
    const initialOptions = {
      clientId: "Aa9LVrqH_mxtGausxxaqSF2tMa-l91hDInwS1IyLXEgCSGo7SonDozMV7yVm1NUJK6q8D4AOGVCMMUZD",
      currency: "ILS",
      intent: "capture",
    };

    const couponCheck = useAppSelector(selectCouponCheck);

    const discountedTotal = myTotal - (myTotal * (couponCheck.discount / 100));

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