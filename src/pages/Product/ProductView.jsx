import React, { useContext, useEffect, useReducer, useState } from "react";
import "./product_view.scss";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { BaseUrl } from "../../utils/Service";
import { toast } from "react-toastify";
import { addCart,removeCart } from "../../redux/cart/cartService";
import { useDispatch } from "react-redux";

const pincodes = [
  {
    placename: "Nemon",
    pincode: 695020,
  },
];

function Product_view({ setCartcloseToggle }) {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [pincode, setpincode] = useState();
  const [pincodeERR, setpincodeERR] = useState("");
  const [pincodesuceess, setpincodesuceess] = useState("");
  // const [pincodeload, setpincodeload] = useState(false);
  const { data, loading, error } = useFetch(`/product/find/${id}`);
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const addtoCart = async () => {
    try {
      await axios
        .post(`${BaseUrl}/cart/addcart?productId=${data._id}`,{userId:userInfo?.details._id})
        // .then((res) => toast.success(res.data))
        .then(addCart(dispatch));
      // .then(setCartcloseToggle(true));
    } catch (error) {
      console.log(error);
    }
  };
 
  const checkoutHandler = () => {
    if (userInfo === null) {
      navigate("/sign");
    } else {
      addtoCart();
    }
  };

  const BuyHandler = () => {
    if (userInfo === null) {
      // navigate("/sign?redirect=/product");
      navigate(`/sign`, { state: `/product_view/${id}` });
    } else {
      addtoCart().then(setCartcloseToggle(true));
      // navigate("/product/checkoutproduct");
    }
  };

  const pincodeCheck = () => {
    if (pincode === "") {
      setpincodeERR("Please enter a pincode");
    } else {
      setpincodesuceess("");
      setpincodeERR("");
      const checkPin = pincodes.filter(
        (pincodelist) => pincodelist.pincode === parseInt(pincode)
      );
      if (checkPin.length === 0) {
        setpincodeERR(
          `Sorry, delivery is not available right now in this ${pincode} pincode`
        );
      } else {
        setpincodesuceess(
          `Our delivery is available in this ${pincode}  "${checkPin[0].placename}"`
        );
      }
    }
  };

  return (
    <>
      {loading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <>
          <div className="productView_conatiner">
            <div className="productImg_conatiner">
              <section>
                <img src={data.image} alt="" />
              </section>
            </div>
            <div className="productDetails_conatiner">
              <h1>{data.name}</h1>
              <p className="desDetails">{data.description}</p>

              <h3>
                <span>Rs.</span> {data.price}
                <span className="orgPrice">Rs. {data.strikeprice} </span>
                <span className="off">
                  (
                  {Math.trunc(
                    (100 * (data.strikeprice - data.price)) / data.strikeprice
                  )}
                  % off)
                </span>
              </h3>
              <h5 className="lableText">Select size:</h5>
              <div className="sizeBtn">
                <button>S</button>
                <button>M</button>
                <button>L</button>
              </div>
              <div className="main_btn">
                {/* <button onClick={() => addtoCart()}>Add to cart</button> */}
                <button onClick={() => checkoutHandler()}>Add to cart</button>
                <button onClick={() => BuyHandler()}>Buy Now</button>
              </div>
              <div className="deliveryOption">
                <div>
                  <input
                    type="text"
                    onChange={(e) => setpincode(e.target.value)}
                    value={pincode}
                  />
                  <button onClick={() => pincodeCheck()}>Check</button>
                </div>

                <small
                  className={`${
                    pincodeERR === "" && pincodesuceess === ""
                      ? " "
                      : pincodesuceess
                      ? "pincodeSucess"
                      : "pincodeerror"
                  }`}
                >
                  {pincodeERR === "" && pincodesuceess === ""
                    ? "Please enter PIN code to check delivery availability"
                    : pincodesuceess
                    ? pincodesuceess
                    : pincodeERR}
                </small>
              </div>
              <div className="productDetails">
                <h4>Product Details</h4>
                <p>{data.description}</p>
                <div className="prodctsep">
                  <section>
                    <p>
                      Fabric <br /> <span>{data.fabric}</span>
                    </p>
                    <p>
                      Fit <br /> <span>{data.fit}</span>
                    </p>
                    <p>
                      Occasion <br /> <span>{data.occasion}</span>
                    </p>
                  </section>
                  <section>
                    <p>
                      Multipack <br /> <span>{data.multipack}</span>
                    </p>
                    <p>
                      Neck <br /> <span>{data.neck}</span>
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </div>
          <div className="similarProduct">
            <h4>Similar Product</h4>
            <div className="ProductCard">
              {/* {products
            .filter(
              (products) =>
                products.subcategory === product.subcategory &&
                products._id !== product._id
            )
            .slice(0, 6)
            .map((products) => (
              <ProductCard product={products} key={products._id} />
            ))} */}
            </div>
            <div className="loadMore">
              <Link to="/product" className="loadMoreBtn">
                + Load More
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Product_view;
