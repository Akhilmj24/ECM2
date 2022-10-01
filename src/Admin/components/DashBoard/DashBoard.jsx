import React, { useState } from "react";
import ManageUsers from "../Manage users/ManageUsers";
import AddProduct from "../Products/AddProduct";
import AllProducts from "../Products/AllProducts";
import "./dashBoard.scss";
import { useNavigate } from "react-router-dom";
import EditProduct from "../Products/EditProduct";
import Feature from "../Feature/Feature";
const DashBoard = () => {
  const [toggleMode, setToggleMode] = useState(true);
  const [toggleMenu, setToggleMenu] = useState("Product");
  const [productId, setproductId] = useState("");
  const navigate = useNavigate();

  const userlogout = () => {
    localStorage.removeItem("user");
    navigate("/sign");
  };
  return (
    <div
      className={` ${
        toggleMode ? `dashboardConatiner ` : `dashboardConatiner light-mode`
      }`}
    >
      <div className="dark-light" onClick={() => setToggleMode(!toggleMode)}>
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      </div>
      <div className="app">
        <div className="header">
          <div className="menu-circle"></div>
          <div className="header-menu">
            <a
              className={`menu-link ${toggleMenu === "Product" ? `is-active` : ``}`}
              onClick={() => setToggleMenu("Product")}
            >
              All Product
            </a>
            <a
              className={`menu-link ${
                toggleMenu === "AddProduct" ? `is-active` : ``
              }`}
              onClick={() => setToggleMenu("AddProduct")}
            >
              Add Product
            </a>
            <a
              className={`menu-link ${
                toggleMenu === "ManageUsers" ? `is-active` : ``
              }`}
              onClick={() => setToggleMenu("ManageUsers")}
            >
              Manage Users
            </a>
            <a
              className={`menu-link ${toggleMenu === "Orders" ? `is-active` : ``}`}
              onClick={() => setToggleMenu("Orders")}
            >
              Orders
            </a>
            {/* <a className="menu-link notify">Orders</a> */}
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Search" />
          </div>
          <div className="header-profile">
            <div className="notification">
              <span className="notification-number">3</span>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-bell"
              >
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
              </svg>
            </div>
            <img
              className="profile-img"
              src="https://images.unsplash.com/photo-1600353068440-6361ef3a86e8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt=""
            />
            <h5 onClick={() => userlogout()}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </h5>
            {/* <h3>Akhil</h3> */}
          </div>
        </div>
        <div className="wrapper">
          <div className="left-side">
            <div className="side-wrapper">
              <div className="side-title"></div>
              <div className="side-menu">
                <a onClick={() => setToggleMenu("Product")}>
                  <svg viewBox="0 0 512 512">
                    <g xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                      <path
                        d="M0 0h128v128H0zm0 0M192 0h128v128H192zm0 0M384 0h128v128H384zm0 0M0 192h128v128H0zm0 0"
                        data-original="#bfc9d1"
                      />
                    </g>
                    <path
                      xmlns="http://www.w3.org/2000/svg"
                      d="M192 192h128v128H192zm0 0"
                      fill="currentColor"
                      data-original="#82b1ff"
                    />
                    <path
                      xmlns="http://www.w3.org/2000/svg"
                      d="M384 192h128v128H384zm0 0M0 384h128v128H0zm0 0M192 384h128v128H192zm0 0M384 384h128v128H384zm0 0"
                      fill="currentColor"
                      data-original="#bfc9d1"
                    />
                  </svg>
                  Products
                </a>
                <a onClick={() => setToggleMenu("Notifications")}>
                  <svg viewBox="0 0 488.932 488.932" fill="currentColor">
                    <path d="M243.158 61.361v-57.6c0-3.2 4-4.9 6.7-2.9l118.4 87c2 1.5 2 4.4 0 5.9l-118.4 87c-2.7 2-6.7.2-6.7-2.9v-57.5c-87.8 1.4-158.1 76-152.1 165.4 5.1 76.8 67.7 139.1 144.5 144 81.4 5.2 150.6-53 163-129.9 2.3-14.3 14.7-24.7 29.2-24.7 17.9 0 31.8 15.9 29 33.5-17.4 109.7-118.5 192-235.7 178.9-98-11-176.7-89.4-187.8-187.4-14.7-128.2 84.9-237.4 209.9-238.8z" />
                  </svg>
                  Notifications
                  <span className="notification-number updates">3</span>
                </a>
                <a onClick={() => setToggleMenu("Orders")}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20,16V5a3,3,0,0,1,3-3,1,1,0,0,0,0-2,5.006,5.006,0,0,0-5,5V16.279l-2.734.912a3,3,0,0,0-.156-1l-1.553-5.1A3.007,3.007,0,0,0,9.788,9.142l-6.7,2.13A3.013,3.013,0,0,0,1.129,15l1.634,5.373a2.966,2.966,0,0,0,.457.831l-2.536.845a1,1,0,0,0,.632,1.9L16.1,19.023A4.017,4.017,0,0,0,19.974,24C25.232,23.864,25.255,16.169,20,16ZM4.662,19.748,3.043,14.421A1.006,1.006,0,0,1,3.7,13.178l6.7-2.13a1,1,0,0,1,1.252.638L13.2,16.792l.011.031a1,1,0,0,1-.508,1.221l-6.888,2.3A1,1,0,0,1,4.662,19.748ZM19.974,22a2,2,0,0,1,0-4A2,2,0,0,1,19.974,22ZM10.05,14A1,1,0,0,1,9.4,15.256l-2.464.785a1,1,0,0,1-.606-1.907l2.465-.784A1,1,0,0,1,10.05,14Z" />
                  </svg>
                  Orders
                  <span className="notification-number updates">3</span>
                </a>
                <a onClick={() => setToggleMenu("Feature")}>
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="m16 16a1 1 0 0 1 -1 1h-2v2a1 1 0 0 1 -2 0v-2h-2a1 1 0 0 1 0-2h2v-2a1 1 0 0 1 2 0v2h2a1 1 0 0 1 1 1zm6-5.515v8.515a5.006 5.006 0 0 1 -5 5h-10a5.006 5.006 0 0 1 -5-5v-14a5.006 5.006 0 0 1 5-5h4.515a6.958 6.958 0 0 1 4.95 2.05l3.484 3.486a6.951 6.951 0 0 1 2.051 4.949zm-6.949-7.021a5.01 5.01 0 0 0 -1.051-.78v4.316a1 1 0 0 0 1 1h4.316a4.983 4.983 0 0 0 -.781-1.05zm4.949 7.021c0-.165-.032-.323-.047-.485h-4.953a3 3 0 0 1 -3-3v-4.953c-.162-.015-.321-.047-.485-.047h-4.515a3 3 0 0 0 -3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3z" />
                  </svg>
                  Add Feature
                </a>
              </div>
            </div>
            <div className="side-wrapper">
              <div className="side-title">Categories</div>
              <div className="side-menu">
                <a>
                  <svg viewBox="0 0 512 512" fill="currentColor">
                    <path d="M448.249,0H341.999c-11.736,0-21.25,9.53-21.25,21.285s9.514,21.285,21.25,21.285h97.453L294.271,187.991  c-78.572-62.08-192.511-48.605-254.488,30.097S-8.742,410.916,69.83,472.996s192.511,48.605,254.488-30.097  c51.91-65.917,51.91-158.893,0-224.81L469.5,72.668v97.614c0,11.756,9.514,21.285,21.25,21.285s21.25-9.53,21.25-21.285V63.856  C512,28.589,483.458,0,448.249,0z M182.622,468.275c-76.285,0-138.126-61.943-138.126-138.354s61.841-138.354,138.126-138.354  s138.126,61.943,138.126,138.354C320.655,406.293,258.868,468.181,182.622,468.275z" />
                  </svg>
                  MEN
                </a>
                <a>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20,8a8,8,0,1,0-9,7.931V19H8v2h3v3h2V21h3V19H13V15.931A8.008,8.008,0,0,0,20,8ZM6,8a6,6,0,1,1,6,6A6.006,6.006,0,0,1,6,8Z" />
                  </svg>
                  FEMALE
                </a>
                <a>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24,11.5a3.5,3.5,0,0,0-2.149-3.226,10,10,0,0,0-19.7,0,3.5,3.5,0,0,0,1.119,6.718,10.607,10.607,0,0,0,2.071,2.955,8.908,8.908,0,0,0-2.272,4.928,1,1,0,0,0,.868,1.117A1.093,1.093,0,0,0,4.061,24a1,1,0,0,0,.991-.875,6.924,6.924,0,0,1,1.815-3.872A8.948,8.948,0,0,0,12,21a8.94,8.94,0,0,0,5.119-1.74,6.922,6.922,0,0,1,1.808,3.862,1,1,0,0,0,.991.876,1.063,1.063,0,0,0,.125-.008,1,1,0,0,0,.868-1.116,8.9,8.9,0,0,0-2.261-4.918,10.622,10.622,0,0,0,2.082-2.966A3.5,3.5,0,0,0,24,11.5Zm-3.752,1.473a.993.993,0,0,0-1.117.651C18.215,16.222,15.13,19,12,19s-6.215-2.78-7.131-5.378a.994.994,0,0,0-1.117-.651A1.606,1.606,0,0,1,3.5,13a1.5,1.5,0,0,1-.27-2.972,1,1,0,0,0,.816-.878A7.961,7.961,0,0,1,8.13,3a4.075,4.075,0,0,0-.022,1.942,4,4,0,0,0,7.688.318A.977.977,0,0,0,14.851,4H14.7a.867.867,0,0,0-.806.631A2,2,0,1,1,12,2a7.978,7.978,0,0,1,7.954,7.15,1,1,0,0,0,.816.878A1.5,1.5,0,0,1,20.5,13,1.606,1.606,0,0,1,20.248,12.973Z" />
                    <circle cx="9.5" cy="11.5" r="1.5" />
                    <circle cx="14.5" cy="11.5" r="1.5" />
                  </svg>
                  KIDS
                </a>
              </div>
            </div>
          </div>
          <div className="main-container">
            {/* <div className="main-header">
              <a className="menu-link-main">All Products</a>
              <div className="header-menu">
                <a className="main-header-link is-active">Desktop</a>
                <a className="main-header-link">Mobile</a>
                <a className="main-header-link">Web</a>
              </div>
            </div> */}
            <div className="content-wrapper">
              <div className="content-section">
                {toggleMenu === "Product" ? (
                  <AllProducts
                    setToggleMenu={setToggleMenu}
                    setproductId={setproductId}
                  />
                ) : toggleMenu === "AddProduct" ? (
                  <AddProduct />
                ) : toggleMenu === "ManageUsers" ? (
                  <ManageUsers />
                ) : toggleMenu === "Orders" ? (
                  <h1>orders</h1>
                ) : toggleMenu === "Notifications" ? (
                  <h1>Noti</h1>
                ) : toggleMenu === "EditProduct" ? (
                  <EditProduct
                    productId={productId}
                    setToggleMenu={setToggleMenu}
                  />
                ) : toggleMenu === "Feature" ? (
                  <Feature />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="overlay-app"></div>
      </div>
    </div>
  );
};

export default DashBoard;
