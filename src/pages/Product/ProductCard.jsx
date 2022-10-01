import React from "react";
import "./card.scss";
import { Link, useNavigate } from "react-router-dom";
import bag from "../../utils/images/bag-svgrepo-com.svg";
import heart from "../../utils/images/heart-svgrepo-com.svg";



const ProductCard = ({product}) => {
  
  const navigate = useNavigate();
  // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  
  
  return (
    <>
      <div className="productcard_container">
        <button className="addtoCart" >
          <img src={heart} alt="" />
        </button>
        <button className=" addtoCart addtoWish" >
          <img src={bag} alt="" />
        </button>
        <Link
          to={`/product_view/${product._id}`}
          style={{ textDecoration: "none" }}
        >
          <div className="imgProduct">
            <img src={product.image} alt="" />
            <div className="buyNOW">
              <button>BUY NOW</button>
            </div>
          </div>
        </Link>
        <Link
          to={`/product_view/${product._id}`}
          style={{ textDecoration: "none" }}
        >
          <div className="productContent">
            <h3>{product.name}</h3>
            {/* <p>{product.description} </p> */}
            <h1 className="productPrice">
              Rs. {product.price}
              <span className="offerStrike">Rs. {product.strikeprice}</span>
            </h1>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
