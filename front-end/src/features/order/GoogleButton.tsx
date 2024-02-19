import GooglePayButton from '@google-pay/button-react';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCart } from "../cart/cartSlice";
import { selectCouponCheck } from "../coupon/couponSlice";
import { getAddressesAsync, initGuestAddresses, selectAddress, selectGuestAddresses } from "../shipping/shippingSlice";
import { postOrderAsync, selectSavedCoupon, selectSavedNote, selectSavedTotal } from "./orderSlice";



const GoogleButton = () => {
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

    const couponCheck = useAppSelector(selectCouponCheck);

    const discountedTotal = (myTotal - (myTotal * (couponCheck.discount / 100))).toFixed(2);

  return (
    <div>
    <GooglePayButton
      environment="TEST"
      paymentRequest={{
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: 'CARD',
            parameters: {
              allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
              allowedCardNetworks: ['MASTERCARD', 'VISA'],
            },
            tokenizationSpecification: {
              type: 'PAYMENT_GATEWAY',
              parameters: {
                gateway: 'example',
                gatewayMerchantId: 'exampleGatewayMerchantId',
              },
            },
          },
        ],
        merchantInfo: {
          merchantId: 'BCR2DN4TXWK5JZZE',
          merchantName: 'Escape Shoes',
        },
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPriceLabel: 'Total',
          totalPrice: String(discountedTotal),
          currencyCode: 'ILS',
          countryCode: 'IL',
        },
      }}
      onLoadPaymentData={paymentRequest => {
        console.log('load payment data', paymentRequest);
      }}
      
    />
  </div>
  )
}

export default GoogleButton