import { useEffect, useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./pages/Navbar/NavBar";
import Home from "./pages/Home/Home";
import SignUp from "./pages/Login/SignUp";
import Productpage from "./pages/Product/Productpage";
import ProductView from "./pages/Product/ProductView";
import DashBoard from "./Admin/components/DashBoard/DashBoard";
import PrivateRoute from "./utils/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./pages/Loading/Loading";
import EditProduct from "./Admin/components/Products/EditProduct";
import Profile from "./pages/Profile/Profile";
import Cart from "./pages/Cart/Cart";

function App() {
  const [cartcloseToggle, setCartcloseToggle] = useState(false);
  const [profilecloseToggle, setProfilecloseToggle] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const userInfo = JSON.parse(localStorage.getItem("user"));

  // to know the page is scrolling
  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollTop);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  useEffect(() => {
    setCartcloseToggle(false);
    setProfilecloseToggle(false);
  }, [scrolling]);
  // to know the page is scrolling
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <NavBar
          setCartcloseToggle={setCartcloseToggle}
          setProfilecloseToggle={setProfilecloseToggle}
        />
        <Cart
          cartcloseToggle={cartcloseToggle}
          setCartcloseToggle={setCartcloseToggle}
        />
        <Profile
          profilecloseToggle={profilecloseToggle}
          setProfilecloseToggle={setProfilecloseToggle}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign" element={<SignUp />} />
          <Route path="/product" element={<Productpage />} />
          <Route path="/product_view/:id" element={<ProductView setCartcloseToggle={setCartcloseToggle}  />} />
          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<DashBoard />} />
            {/* <Route path="/edit/:id" element={<EditProduct />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
