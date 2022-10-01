import React, { useEffect, useState } from "react";
import Input from "../Const/Input";
import { productDetails } from "./Form";
import "./products.scss";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { BaseUrl } from "../../../utils/Service";
import { toast } from "react-toastify";
import Loading from "../../../pages/Loading/Loading";
import { Image } from "primereact/image";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const EditProduct = ({ productId, setToggleMenu }) => {
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

  const addData = (name) => {
    setformData({
      ...formData,
      name: productId.name,
      productid: productId.productid,
      image: productId.image,
      brand: productId.brand,
      category: productId.category,
      colorname: productId.colorname,
      subcategory: productId.subcategory,
      description: productId.description,
      price: productId.price,
      countInStock: productId.countInStock,
      strikeprice: productId.strikeprice,
      fabric: productId.fabric,
      multipack: productId.multipack,
      neck: productId.neck,
      fit: productId.fit,
      occasion: productId.occasion,
    });
    onHide(name);
    setpopup(false);
  };
  const [image, setImage] = useState(null);
  const [loading, setloading] = useState(false);
  const [popup, setpopup] = useState(true);
  const [displayBasic, setDisplayBasic] = useState(false);
  const handleChange = (prop) => (event) => {
    setformData({ ...formData, [prop]: event.target.value });
  };

  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
  };

  const onClick = (name) => {
    dialogFuncMap[`${name}`](true);
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };
  const reject = (name) => {
    onHide(name);
    setToggleMenu("Product");
  };
  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => reject(name)}
          className="p-button-text"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          onClick={() => addData(name)}
          autoFocus
        />
      </div>
    );
  };
  useEffect(() => {
    onClick("displayBasic");
  }, []);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const imageData = new FormData();
    imageData.append("file", image);
    imageData.append("upload_preset", "ecommerceProduct");

    try {
      setloading(true);
      if (image) {
        const uplaodimage = await axios.post(
          "https://api.cloudinary.com/v1_1/ddfzwogm5/image/upload",
          imageData
        );

        const { url } = uplaodimage.data;

        const newProduct = {
          ...formData,
          image: url,
        };

        const res = await axios.put(
          `${BaseUrl}/product/${productId._id}`,
          newProduct
        );
        toast.success(res.data);
      } else {
        const res = await axios.put(
          `${BaseUrl}/product/${productId._id}`,
          formData
        );
        toast.success(res.data);
      }
      setloading(false);
      setToggleMenu("Product");
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
          <h4>EditProduct </h4>
          {/* <h1 onClick={() => button()}>OKKKK</h1> */}
          <Grid container spacing={2}>
            {productDetails.map((datas) => (
              <Grid
                item
                xs={12}
                sm={12}
                md={3}
                lg={3}
                key={datas.label}
                className="formConatiner"
              >
                <label>{datas.label}</label>
                <Input
                  value={datas.label}
                  data={formData}
                  dataSubvalue={datas.onchange}
                  onChange={handleChange(datas.onchange)}
                  type={datas.type}
                  options={datas.option}
                  dropdownValue={formData}
                />
              </Grid>
            ))}
          </Grid>

          {/* <img src={
          
          URL.createObjectURL(image)
          }  alt="sad" /> */}
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
                src={image ? URL.createObjectURL(image) : formData.image}
                alt=""
                width="65"
                preview
              />
            ) : (
              <Image
                src={image ? "" : formData.image}
                alt=""
                width="65"
                preview
              />
            )}
          </div>
          <button type="submit">ADD PRODUCT</button>
          {popup ? (
            <div className="dialog-demo">
              <div className="card">
                <h5>Basic</h5>
                {/* <Button
            label="Show"
            icon="pi pi-external-link"
            onClick={() => }
          /> */}
                <Dialog
                  // header="Header"
                  visible={displayBasic}
                  style={{ width: "50vw" }}
                  footer={renderFooter("displayBasic")}
                  onHide={() => onHide("displayBasic")}
                >
                  <h1>Do you want to edit this product ?</h1>
                </Dialog>
              </div>
            </div>
          ) : (
            ""
          )}
        </form>
      )}
    </div>
  );
};

export default EditProduct;
