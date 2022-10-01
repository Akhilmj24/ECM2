import axios from "axios";
import { BaseUrl } from "../../utils/Service";
const user = JSON.parse(localStorage.getItem("user"));
export const orderUpdate = (id, quantity) => {
  const updateProduct = async (id, quantity) => {
    await axios.put(`${BaseUrl}/product/order/${id}?quantity=${quantity}`);
  };

  id.map((productid, index) => {
    const quantityCount = quantity[index];
    updateProduct(productid, quantityCount);
  });
};

export const orderPlaced = async (
  productId,
  phone,
  amount,
  address,
  productQuantity,
  paymentMode,
  razorpay_payment_id,
  razorpay_order_id,
  razorpay_signature
) => {
  const data = {
    userId: user.details._id,
    productid: productId,
    phone: phone,
    amount: amount,
    address: address,
    productQuantity: productQuantity,
    paymentdetails: {
      paymentMode: paymentMode,
      orderId: razorpay_payment_id,
      paymentId: razorpay_order_id,
      signature: razorpay_signature,
    },
    orderStatus: "Order Placed",
  };
  console.log(data);
  try {
    axios
      .post(`${BaseUrl}/order/placeorder`, data)
      .then((res) => console.log(res));
  } catch (error) {}
};
