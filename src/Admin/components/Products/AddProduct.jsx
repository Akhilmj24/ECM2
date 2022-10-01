import React, {  useState } from "react";
import Input from "../Const/Input";
import { productDetails } from "./Form";
import "./products.scss";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { BaseUrl } from "../../../utils/Service";
import { toast } from "react-toastify";
import Loading from "../../../pages/Loading/Loading";
import { Image } from "primereact/image";

const AddProduct = () => {
  const [formData, setformData] = useState({
    name: "",
    productid: "",
    image: "",
    brand: "",
    category: "",
    colorname: "",
    subcategory: "",
    description: "",
    price: "",
    countInStock: "",
    strikeprice: "",
    fabric: "",
    multipack: "",
    neck: "",
    fit: "",
    occasion: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setloading] = useState(false);

  const handleChange = (prop) => (event) => {
    setformData({ ...formData, [prop]: event.target.value });
  };


  const handlerSubmit = async (e) => {
    e.preventDefault();
    

    const imageData = new FormData();
    imageData.append("file", image);
    imageData.append("upload_preset", "ecommerceProduct");

    try {
      setloading(true);
      const uplaodimage = await axios.post(
        "https://api.cloudinary.com/v1_1/ddfzwogm5/image/upload",
        imageData
      );

      const { url } = uplaodimage.data;

      const newProduct = {
        ...formData,
        image: url,
      };

      const res = await axios.post(
        `${BaseUrl}/product/createProduct`,
        newProduct
      );
      toast.success(res.data);
      setloading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setloading(false);
    }
  };

  return (
    <div className="addproductConatiner">
      {loading ? (
        <Loading />
      ) : (
        <form action="" onSubmit={(e) => handlerSubmit(e)}>
          <Grid container spacing={2}>
            {productDetails.map((data) => (
              <Grid
                item
                xs={12}
                sm={12}
                md={3}
                lg={3}
                key={data.label}
                className="formConatiner"
              >
                <label>{data.label}</label>
                <Input
                  value={data.label}
                  onChange={handleChange(data.onchange)}
                  type={data.type}
                  options={data.option}
                  dropdownValue={formData}
                 
                />
              </Grid>
            ))}
          </Grid>

          <div className="imgupload">
            <label className="uploader">
              <input
                type="file"
                multiple
                accept=".png, .jpg, .jpeg"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <span className="icon">
                <svg viewBox="0 0 512 512" width="24" title="upload">
                  <path d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z" />
                </svg>
              </span>
              <span className="placeholder">
                {image ? image.name : " Add Images"}
              </span>
            </label>
            {image ? (
              <Image
                src={image ? URL.createObjectURL(image) : ""}
                alt=""
                width="65"
                preview
              />
            ) : (
              ""
            )}
          </div>
          <button type="submit">ADD PRODUCT</button>
        </form>
      )}
    </div>
  );
};

export default AddProduct;
