import { PayPalScriptProvider, PayPalButtons, ReactPayPalScriptOptions  } from "@paypal/react-paypal-js";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { selectCart } from "../cart/cartSlice";
import { postOrderAsync, selectSavedAddress, selectSavedTotal } from "./orderSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";




const PaypalButton = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const cart = useAppSelector(selectCart);
    const myTotal = useAppSelector(selectSavedTotal);
    const savedAddress = useAppSelector(selectSavedAddress);

    

    const onApprove = async (data: any, action: any) => {
      return action.order?.capture().then((details: any) => {
        const tempTotal = cart.reduce((accumulator, item) => {
          return accumulator + item.amount * item.price;
        }, 0);
        const orderDetails = cart.map((item) => ({
          product: Number(item.id),
          amount: item.amount,
          price: Number(item.price * item.amount),
        }));
        const orderData = {
          shipping_address: savedAddress,
        };

        dispatch(postOrderAsync({ orderData, orderDetails }));
        navigate("/")
      })
        
      };
  
    const initialOptions = {
    clientId: "AdP_mKF4VEQj5HkcfXVdAfN4we_j8dMhdlufiEoXho4LxhBcmFfU-xiLNShsbTcfmqcme5NP6-TvAMsT",
      currency: "USD",
      intent: "capture",
    };

    const [total, setTotal] = useState(0);

    useEffect(() => {
        let tempTotal = 0;
        cart.forEach((item) => {
          tempTotal += item.amount * item.price;
        });
        const roundedTotal = Math.round((tempTotal + Number.EPSILON) * 100) / 100;
        setTotal(roundedTotal);
      }, [cart, total]);

      
    return (
      <div>
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            // disabled={!savedAddress}
            createOrder={(data, actions) => {
              let totalWithShipping = myTotal;
              if (myTotal < 50) {
                totalWithShipping += 5;
              }
              return actions.order.create({
                purchase_units: [
                  {
                    amount: { value: String(totalWithShipping) },
                  },
                ],
              });
            }}
            onApprove={onApprove}
            onError={() => {
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