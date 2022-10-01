import React, { useEffect } from "react";
import "./navbar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";

const NavBar = ({ setCartcloseToggle, setProfilecloseToggle }) => {
  const { pathname } = useLocation();
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const { data, reFetch } = useFetch(`/cart/count?userId=${userInfo.details._id}`);
  const navigate = useNavigate()
  const userlogout = () => {
    // window.location.reload(false);
    localStorage.clear(); 
    navigate("/")
  };
  const { cartItems, quantity } = useSelector((state) => state.cart);

  useEffect(() => {
    reFetch();
  }, [cartItems, quantity]);

  if (pathname === "/sign" || pathname === "/admin") return null;
  return (
    <div className="navContainer">
      <div className="categoryContainer">
        <ul>
          <Link to="/">
            <li>MEN</li>
          </Link>
          <Link to="/">
            <li>WOMEN</li>
          </Link>
          <Link to="/">
            <li>KIDS</li>
          </Link>
        </ul>
      </div>
      <div className="logoConatiner">
        <Link to="/">
          <h1>RiBu.</h1>
        </Link>
      </div>
      <div className="menuConatiner">
        <ul>
          <li>search</li>
          {data ? (
            <>
              <li onClick={() => setCartcloseToggle(true)}>
                cart ({data ? data : "0"})
              </li>
            </>
          ) : (
            ``
          )}

          {userInfo === null ? (
            <Link to="/sign">
              <li>login</li>
            </Link>
          ) : (
            <>
              {/* <li>profile</li> */}
              <li onClick={() => setProfilecloseToggle(true)}>
                {userInfo.details.name}
              </li>
              <li onClick={() => userlogout()}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
