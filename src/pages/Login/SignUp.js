import React, { useState } from "react";
import "./login.scss";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../utils/Service";
import { toast } from "react-toastify";

const SignUp = () => {
  const [screenToggle, setscreenToggle] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordShow, setpasswordShow] = useState(false);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const location = useLocation();
  const redirect = location.state || "/";
  const navigate = useNavigate();
  const fromData = {
    name,
    email,
    password,
  };
  const toggleForm = () => {
    setscreenToggle(!screenToggle);
  };
  const onSubmit = async (e, trgt) => {
    e.preventDefault();
    if (email === "") {
      seterror("Please enter email");
    } else if (password === "") {
      seterror("Please enter password");
    } else {
      if (trgt === "signUp") {
        try {
          const res = await axios.post(`${BaseUrl}/auth/register`, fromData);
          localStorage.setItem("user", JSON.stringify(res.data));
          if (res.data.isAdmin) {
            navigate("/admin");
          } else {
            navigate(redirect);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      } else {
        setloading(true);
        try {
          const res = await axios.post(`${BaseUrl}/auth/login`, fromData);
          localStorage.setItem("user", JSON.stringify(res.data));
          if (res.data.isAdmin) {
            navigate("/admin");
          } else {
            navigate(redirect);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
        setloading(false);
      }
    }
  };
  return (
    <div className="loginConatiner">
      <div
        className={`container ${screenToggle ? "" : "right-panel-active"}`}
        id="container "
      >
        <div className="form-container sign-up-container">
          <form onSubmit={(e) => onSubmit(e)}>
            <h1>Create Account</h1>
            <div className="social-container">
              <a className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
            </div>
            <span>or use your email for registration</span>

            <div className="inputSection">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <i className="fa-solid fa-user"></i>
            </div>
            <div className="inputSection">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="fa-solid fa-envelope"></i>
            </div>
            <div className="inputSection">
              <input
                type={`${passwordShow ? "text" : "password"}`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
             <i
                className={`fa-solid ${
                  passwordShow ? `fa-eye-slash` : `fa-eye`
                }`}
                onClick={() => setpasswordShow(!passwordShow)}
              ></i>
            </div>
            <button type="submit" onClick={(e) => onSubmit(e, "signUp")}>
              Sign Up
            </button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={(e) => onSubmit(e)}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
            </div>
            <span>or use your account</span>
            <div className="inputSection">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="fa-solid fa-envelope"></i>
            </div>
            <div className="inputSection">
              <input
                type={`${passwordShow ? "text" : "password"}`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <i
                className={`fa-solid ${
                  passwordShow ? `fa-eye-slash` : `fa-eye`
                }`}
                onClick={() => setpasswordShow(!passwordShow)}
              ></i>
            </div>
            <a>Forgot your password ? </a>
            <small className="errorForm">{error}</small>

            <button type="submit" onClick={(e) => onSubmit(e, "signIn")}>
              {loading ? (
                <div className="main">
                  <div className="loader"></div>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back !</h1>
              <p>
                To keep fashionable with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => toggleForm()}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend !</h1>
              <p>Enter your personal details and start fashionable with us</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => toggleForm()}
              >
                create an account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="footer">
        <b> Follow us </b>
        <div className="icons">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            className="social"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://twitter.com/" target="_blank" className="social">
            <i className="fab fa-twitter-square"></i>
          </a>
          <a href="https://linkedin.com/" target="_blank" className="social">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div> */}
    </div>
  );
};

export default SignUp;
