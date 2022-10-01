import React from "react";
import "./category.scss";
import useFetch from "../../hooks/useFetch";

const Brand = () => {
  const { data, error, loading } = useFetch("/feature/brand");
  
  return (
    <div className="brandLogo">
      {data.map((brand) => (
        <div className="brandLogoCard" key={brand._id}>
          <img src={brand.image} alt="" />
        </div>
      ))}
    </div>
  );
};

export default Brand;
