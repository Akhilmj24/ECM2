import React, { useEffect, useState } from "react";
import "./productpage.scss";
import ProductCard from "./ProductCard";
import axios from "axios";
import { BaseUrl } from "../../utils/Service";

function Productpage() {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  const [Max, setMax] = useState("999999");
  const [Min, setMin] = useState("0");
  const [category, setcategory] = useState("");
  const [subcategory, setsubcategory] = useState("");
  const [getcategory, setgetcategory] = useState();
  const [getsubcategory, setgetsubcategory] = useState();
  
  const getProduct = async () => {
    setloading(true);
    await axios
      .get(
        `${BaseUrl}/product?min=${Min}&max=${Max}&categorys=${subcategory}&subcategorys=${category}`
      )
      .then((res) => setdata(res.data))
      .catch((error) => seterror(error));
    setloading(false);
  };

  const getCategory = async () => {
    await axios
      .get(`${BaseUrl}/feature/subcategory`)
      .then((res) => setgetcategory(res.data))
      .catch((error) => seterror(error));
  };

  const getSubcategory = async () => {
    await axios
      .get(`${BaseUrl}/feature/category`)
      .then((res) => setgetsubcategory(res.data))
      .catch((error) => seterror(error));
  };

  useEffect(() => {
    getProduct();
    getCategory();
    getSubcategory();
  }, []);

  const filterhandler = (e) => {
    e.preventDefault();
    getProduct();
  };
  const restFilter=()=>{
    setcategory("")
    setsubcategory("")
    setMin("0")
    setMax("999999")
  }
  return (
    <div className="productPage_container">
      <div className="filterSection">
        <form action="" onSubmit={(e) => filterhandler(e)}>
          <div>
            <label htmlFor="">Category :</label>
            <select
              name="subcategory"
              id="subcategory"
              value={subcategory}
              onChange={(e) => setsubcategory(e.target.value)}
            >
              {getcategory?.map((category) => (
                <option value={category.subcategoryname} key={category._id}>
                  {category.subcategoryname}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="">Price :</label>
            <div>
              <label htmlFor="">Min</label>
              <input
                type="text"
                value={Min}
                onChange={(e) => setMin(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">Max</label>
              <input
                type="text"
                value={Max}
                onChange={(e) => setMax(e.target.value)}
              />
            </div>
          </div>
          <div className="radioBTNgrp">
            {getsubcategory?.map((subcategoryData) => (
              <div key={subcategoryData._id}>
                <input
                
                  type="radio"
                  id="html"
                  name="category"
                  value={subcategoryData.categoryname}
                  onClick={(e) => setcategory(e.target.value)}
                />
                <label for="html">{subcategoryData.categoryname}</label>
              </div>
            ))}
          </div>
          <button type="submit">Filter</button>
          <button onClick={()=>restFilter()}>REST Filter</button>
        </form>
      </div>
      {loading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <>
          <div className="productCardSection">
            {data.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Productpage;
