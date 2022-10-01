import React, { useEffect, useState } from "react";
import "./cart.scss";
import useFetch from "../../hooks/useFetch";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateCart } from "../../redux/cart/cartService";
import axios from "axios";
import { removeCart } from "../../redux/cart/cartService";
import { BaseUrl } from "../../utils/Service";
import { Dialog } from "primereact/dialog";
import { price } from "./address";
import { orderPayment } from "./orderPayment";

function Cart({ cartcloseToggle, setCartcloseToggle }) {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const { data, reFetch } = useFetch(`/cart?userId=${userInfo.details._id}`);
  // console.log(data);
  const [visible, setVisible] = useState(false);
  const [id, setID] = useState();
  const [productCart, setproductCart] = useState();
  const [quantityCart, setquantityCart] = useState();
  const [displayBasic, setDisplayBasic] = useState(false);

  const dispatch = useDispatch();
  const tableShow = (id) => {
    setDisplayBasic(!displayBasic);
  };

  const confirmHandler = (id) => {
    setVisible(true);
  };
  const confirmAccept = () => {
    deletehandler(id);
  };
  const cartProduct = async () => {
    await axios
      .get(`${BaseUrl}/cart?userId=${userInfo.details._id}`)
      .then(
        (res) =>
          setproductCart(res.data.map((product) => product.cartproduct._id)) &
          setquantityCart(res.data.map((product) => product.quantity))
      );
  };
  useEffect(() => {
    cartProduct();
  }, []);

  const addAddressHandler = () => {};
  const deletehandler = async (id) => {
    await axios
      .delete(`${BaseUrl}/address/${id}`)
      .then((res) => toast.success(res.data))
      .then(reFetch())
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    setTimeout(() => {
      reFetch();
    }, 200);
  }, [cartcloseToggle]);
  const sum = data?.reduce((result, item) => {
    return result + item.cartproduct.price * item.quantity;
  }, 0);

  const removecartHandler = (id) => {
    removeCart(id, dispatch).then(reFetch());

    if (data.length === 1) {
      setCartcloseToggle(false);
    }
  };
  const updateCartHandler = async (product, quantity) => {
    if (product.cartproduct.countInStock < quantity) {
      toast.error("Sorry. Product is out of stock");
      return;
    }
    updateCart(product._id, quantity, dispatch).then(reFetch());
  };
  return (
    <div className={`cartConatiner ${cartcloseToggle ? `cartActive` : ``}`}>
      <div className="headCart">
        <div className="back">
          <svg
            onClick={() => setCartcloseToggle(false)}
            width="34"
            height="24"
            viewBox="0 0 34 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M33.0607 13.0607C33.6464 12.4749 33.6464 11.5251 33.0607 10.9393L23.5147 1.3934C22.9289 0.807611 21.9792 0.807611 21.3934 1.3934C20.8076 1.97919 20.8076 2.92893 21.3934 3.51472L29.8787 12L21.3934 20.4853C20.8076 21.0711 20.8076 22.0208 21.3934 22.6066C21.9792 23.1924 22.9289 23.1924 23.5147 22.6066L33.0607 13.0607ZM0 13.5H32V10.5H0V13.5Z"
              fill="black"
            />
          </svg>
        </div>
        <div>
          <h1>RiBu.</h1>
        </div>
      </div>
      <div className="productCardSection">
        {/* {data.length === 0 ? (
          "CART IS EMPTY"
        ) : (
          <>
            {data?.map((data) => (
              <div className="productCartCard" key={data.img}>
                <div className="cartImgConatiner">
                  <img src={data.cartproduct.image} alt="" />
                </div>
                <div className="cartdeatilsConatiner">
                  <h3>{data.cartproduct.name.substring(1, 28)}</h3>
                  <small>
                    XS - Pink - <span className="price">{data.price}</span>
                  </small>
                </div>
              </div>
            ))}
          </>
        )} */}
        {data?.map((data) => (
          <div className="productCartCard" key={data._id}>
            <div className="cartImgConatiner">
              <img src={data.cartproduct.image} alt="" />
            </div>
            <div className="cartdeatilsConatiner">
              <h3>{data.cartproduct.name.substring(1, 28)}</h3>
              <small>
                XS - Pink -{" "}
                <span className="price">{data.cartproduct.price}</span>
              </small>
              <div className="cartRemove">
                <button onClick={() => removecartHandler(data._id)}>
                  Remove
                </button>
                <div className="quantityBtn">
                  <button
                    onClick={() => updateCartHandler(data, data.quantity + 1)}
                  >
                    +
                  </button>
                  <small>{data.quantity}</small>
                  <button
                    onClick={() => updateCartHandler(data, data.quantity - 1)}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="cartAdress">
        <div className="cartAddrescard cartAddrescardActive">
          <input type="checkbox" />
          <h3>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, harum!
          </h3>
        </div>
        <div className="cartAddrescard">
          <h3>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, harum!
          </h3>
        </div>
        <div className="cartAddrescard">
          <h3>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, harum!
          </h3>
        </div>
        <div className="cartAddrescard">
          <h3>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, harum!
          </h3>
        </div>
      </div> */}
      <div className="totalAmount">
        <h5>Price Deatils</h5>
        <dl>
          <div>
            <dt>Price</dt>
            <dd>Rs {sum}</dd>
          </div>
          <div>
            <dt> Discount</dt>
            <dd>- Rs 100</dd>
          </div>
          <div className="total">
            <dt>Total Amount</dt>
            <dd>Rs {sum - 100}</dd>
          </div>
        </dl>
      </div>
      <div className="buyBtn">
        <button onClick={() => tableShow()}>Buy now </button>
      </div>
      <BuyProduct
        displayBasic={displayBasic}
        setDisplayBasic={setDisplayBasic}
        productCart={productCart}
        quantityCart={quantityCart}
      />
    </div>
  );
}

export const BuyProduct = ({
  displayBasic,
  setDisplayBasic,
  productCart,
  quantityCart,
}) => {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const { data, reFetch } = useFetch(`/address?userId=${userInfo.details._id}`);
  const [addressMark, setaddressMark] = useState(false);
  const [currentAddress, setcurrentAddress] = useState(0);
  const [selectedAddress, setselectedAddress] = useState();
  const [paymentMode, setpaymentMode] = useState("OnlinePayemt");
  const onHide = () => {
    setDisplayBasic(!displayBasic);
  };

  const getAddress = (index) => {
    console.log(index);
    console.log("wrking")
    const addressData = data.map((data) => ({
      address: data.address,
      landmark: data.landmark,
      name: data.name,
      phone: data.phone,
    }))[index === undefined ? 0 : index];
    setselectedAddress(addressData);
  };

  useEffect(() => {
    setTimeout(() => {
      
      getAddress(0)
    }, 200);
  }, [])
  // console.log(selectedAddress);
  

  const onValueChange = (event) => {
    setpaymentMode(event.target.value);
  };
  return (
    <div>
      <Dialog
        header={`Place order`}
        visible={displayBasic}
        style={{ width: "80vw", height: "90vh" }}
        onHide={() => onHide()}
      >
        <div className="buyConatiner">
          <div className="buySection">
            <h5>Address</h5>
            <div className="selectAddress">
              {data.map((address, index) => (
                <div
                  className={`addressSection ${
                    index === currentAddress ? `selectedAssress` : ``
                  }`}
                  onClick={() => getAddress(index)}
                >
                  <p>{address.name}</p>
                  <p>{address.address}</p>
                  <p>{address.phone}</p>
                  <p>{address.pincode}</p>
                  <p>{address.landmark}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="priceSection">
            <div className="priceConatiner">
              <dl>
                <div>
                  <dt>SubTotal</dt>
                  <dd>Rs </dd>
                </div>
                <div>
                  <dt> Shipping costs</dt>
                  <dd>- Rs 100</dd>
                </div>
                <div>
                  <dt> Order Discount</dt>
                  <dd>- Rs 100</dd>
                </div>
                <div className="total">
                  <dt>Grand Total</dt>
                  <dd>Rs 8596</dd>
                </div>
              </dl>
            </div>

            <div className="radioPaymentoption">
              <div onChange={onValueChange}>
                <input
                  type="radio"
                  id="COD"
                  name="paymentMode"
                  value="COD"
                  checked={paymentMode === "COD"}
                />
                <label for="COD">COD</label>

                <input
                  type="radio"
                  id="OnlinePayemt"
                  name="paymentMode"
                  value="OnlinePayemt"
                  checked={paymentMode === "OnlinePayemt"}
                />
                <label for="OnlinePayemt">Online Payemt</label>
              </div>
              <button
                onClick={() =>
                  orderPayment(
                    productCart,
                    quantityCart,
                    selectedAddress,
                    paymentMode
                  )
                }
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
export default Cart;
