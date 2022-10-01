import React from "react";
import "./home.scss";
import { Link } from "react-router-dom";
import base1 from "../../utils/images/base1.jpg";
import base2 from "../../utils/images/base2.jpg";
import NewArrivals from "../New Arrivals/NewArrivals";
import Category from "../Category/Category";
function Home() {
  return (
    <div>
      <div className="homecontainer">
        <div className="bannerMSG">
          <h1>
            You can have anything you want in life if you
            <span>DRESS</span>for it.
          </h1>
          <svg
            width="380"
            height="37"
            viewBox="0 0 427 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M425.768 20.2678C426.744 19.2915 426.744 17.7085 425.768 16.7322L409.858 0.82233C408.882 -0.15398 407.299 -0.15398 406.322 0.82233C405.346 1.79864 405.346 3.38155 406.322 4.35786L420.464 18.5L406.322 32.6421C405.346 33.6184 405.346 35.2014 406.322 36.1777C407.299 37.154 408.882 37.154 409.858 36.1777L425.768 20.2678ZM0 21H208.5V16H0V21ZM208.5 21H424V16H208.5V21Z"
              fill="white"
            />
          </svg>
          <Link to="">
            <h2>SHOP NOW</h2>
          </Link>
        </div>
        <div className="bannerPhoto">
          <div className="smallPhoto">
            <img src={base2} alt="" />
          </div>
          <div className="mediumPhoto">
            <img src={base1} alt="" />
          </div>
        </div>
      </div>
      <div className="newArrivalsConatiner">
        <NewArrivals />
      </div>
      <div className="categoryConatiner">
        <Category />
     
      </div>
    </div>
  );
}

export default Home;
