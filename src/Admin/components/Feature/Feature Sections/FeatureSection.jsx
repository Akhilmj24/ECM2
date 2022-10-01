import React, { useState } from "react";
import "../feature.scss";
import axios from "axios";
import { Image } from "primereact/image";
import { toast } from "react-toastify";
import { HandlerAdd } from "../../../utils/Image/ServiceHandler/ServiceHandler";
import useFetch from "../../../../hooks/useFetch";
import DialogBox from "../../Const/DialogBox";

const FeatureSection = ({
  setloading,
  feature,
  createFeature,
  isImage,
  uploadFeatureName,
}) => {
  const [image, setImage] = useState();
  const [formData, setFormdata] = useState("");

  const [displayBasic, setDisplayBasic] = useState(false);
  const tableShow = () => {
    setDisplayBasic(!displayBasic);
  };

  const upperCase = feature.charAt(0).toUpperCase() + feature.slice(1);
  const addBrandHandler = async (e) => {
    e.preventDefault();
    if (isImage) {
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
        // const name = uploadFeatureName;
        const newData = {
            [uploadFeatureName]: formData.toUpperCase(),
          image: url,
        };

        HandlerAdd(`/feature/${createFeature}`, newData)
          .then((res) => toast.success(res.data))
          .catch((error) => toast.error(error.response.data.message));

        setloading(false);
      } catch (error) {
        toast.error(error.response.data.message);
        setloading(false);
      }
    } else {
      const newData = {
        [uploadFeatureName]: formData.toUpperCase(),
      };
      HandlerAdd(`/feature/${createFeature}`, newData)
        .then((res) => toast.success(res.data))
        .catch((error) => toast.error(error.response.data.message));

      setloading(false);
    }
  };
  return (
    <div className="barndConatiner">
      <div className="headingsection">ADD {feature + "s"}</div>
      {isImage ? (
        <>
          <input
            type="text"
            placeholder="brand name"
            value={formData.toUpperCase()}
            onChange={(e) => setFormdata(e.target.value)}
          />
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
        </>
      ) : (
        <input
          type="text"
          placeholder={`${feature} name`}
          value={formData.toUpperCase()}
          onChange={(e) => setFormdata(e.target.value)}
        />
      )}

      <button onClick={(e) => addBrandHandler(e)}>ADD {feature}</button>
      <p onClick={() => tableShow()}>View All {feature + "s"}</p>
      <DialogBox
        section={upperCase}
        displayBasic={displayBasic}
        setDisplayBasic={setDisplayBasic}
        geturl={`/feature/${feature}`}
        deleteurl={`/feature/${feature}`}
      />
    </div>
  );
};

export default FeatureSection;
