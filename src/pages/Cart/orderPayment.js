import axios from "axios";
import { toast } from "react-toastify";
import { BaseUrl } from "../../utils/Service";
import { orderPlaced, orderUpdate } from "./orderService";

export const orderPayment = (productId, productQuantity,address,paymentMode) => {
  const userInfo= JSON.parse(localStorage.getItem("user"))
  console.log(address.phone)
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";

  script.onerror = () => {
    alert("Razorpay SDK failed to load. Are you online?");
  };
  script.onload = async () => {
    try {
      const result = await axios.post(`${BaseUrl}/payment/createorder`, {
        // amount: totalPrice * 100,
        amount: 100 * 100,
      });
      const { amount, id: order_id, currency } = result.data;
      const {
        data: { key: razorpayKey },
      } = await axios.get(`${BaseUrl}/payment/`);
      
      const options = {
        key: razorpayKey,
        amount: amount,
        currency: currency,
        name: "RiBu",
        order_id: order_id,
        handler: async function (response) {
          const results = await axios
            .post(`${BaseUrl}/payment/payorder`, {
              phone: address.phone,
              address: address,
              productId: productId,
              amount: amount,
              paymentMode: paymentMode,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            })
            .then((res) => toast.success(res.data.message))
            // .then((res)=>console.log(res))
            .then(() => orderUpdate(productId, productQuantity))
            .then(() =>
              orderPlaced(
                productId,
                address.phone,
                amount,
                address,
                productQuantity,
                paymentMode,
                response.razorpay_payment_id,
                response.razorpay_order_id,
                response.razorpay_signature
              )
            );

          // setActiveIndex(2);
          // settransactionDone(result);
          // uploadOrderproduct("OP", cartItems, selectedAddress, result);
        },
        prefill: {
          name: userInfo.details.name,
          email: userInfo.details.email,
          contact: "5465465465564",
        },
        notes: {
          address: address,
        },
        // theme: {
        //   color: "#80c0f0",
        // },
      };

      // setLoading(false);
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      alert(err);
      // setLoading(false);
    }
  };
  document.body.appendChild(script);
};
