import React, { useEffect, useState } from "react";
import "./profile.scss";
import { Dialog } from "primereact/dialog";
import { Grid } from "@mui/material";
import Input from "../../Admin/components/Const/Input";
import { editForm } from "./editForm";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { BaseUrl } from "../../utils/Service";
import { toast } from "react-toastify";
import Orders from "./Orders";
import Address from "./Address";
import profileimage from "../../utils/images/profile.jpg"

const Profile = ({ profilecloseToggle, setProfilecloseToggle }) => {
  const [editdisplayBasic, setEditDisplayBasic] = useState(false);
  const [orderdisplayBasic, setOrderDisplayBasic] = useState(false);
  const [addressdisplayBasic, setAddressDisplayBasic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const { data, reFetch } = useFetch(`/user/${userInfo?.details._id}`);
  

  const tableShow = (props) => {
    if (props === "edit") {
      setEditDisplayBasic(!editdisplayBasic);
    } else if (props === "order") {
      setOrderDisplayBasic(!orderdisplayBasic);
    } else {
      setAddressDisplayBasic(!addressdisplayBasic);
    }
  };
  const uplaodImage = async () => {
    const imageData = new FormData();
    imageData.append("file", image);
    imageData.append("upload_preset", "ecommerceProduct");
    try {
      setLoading(true);
      const uplaodimage = await axios.post(
        "https://api.cloudinary.com/v1_1/ddfzwogm5/image/upload",
        imageData
      );

      const { url } = uplaodimage.data;

      const newProduct = {
        image: url,
      };
      axios.put(`${BaseUrl}/user/${data._id}`, newProduct);
      reFetch();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    reFetch();
  }, [editdisplayBasic]);
  useEffect(() => {
    if (image) {
      uplaodImage();
    }
  }, [image]);

  return (
    <div
      className={`profileConatiner ${
        profilecloseToggle ? `profileActive` : ``
      }`}
    >
      <div className="headProfile">
        <div className="back">
          <svg
            onClick={() => setProfilecloseToggle(false)}
            width="34"
            height="24"
            viewBox="0 0 34 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M33.0607 13.0607C33.6464 12.4749 33.6464 11.5251 33.0607 10.9393L23.5147 1.3934C22.9289 0.807611 21.9792 0.807611 21.3934 1.3934C20.8076 1.97919 20.8076 2.92893 21.3934 3.51472L29.8787 12L21.3934 20.4853C20.8076 21.0711 20.8076 22.0208 21.3934 22.6066C21.9792 23.1924 22.9289 23.1924 23.5147 22.6066L33.0607 13.0607ZM0 13.5H32V10.5H0V13.5Z"
              fill="black"
            />
          </svg>
        </div>
        <div>
          <h1>RiBu.</h1>
        </div>
      </div>
      <div className="profileDetails">
        <div className="profileimgConatiner">
          <div className="imgSection">
            {loading ? (
              "Uploading..."
            ) : data.image ? (
              <img src={data.image} alt="" />
            ) : (
              <img src={profileimage} alt="" />
            )}
            <div className="updateImage">
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Filled"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path d="M17.721,3,16.308,1.168A3.023,3.023,0,0,0,13.932,0H10.068A3.023,3.023,0,0,0,7.692,1.168L6.279,3Z" />
                <circle cx="12" cy="14" r="4" />
                <path d="M19,5H5a5.006,5.006,0,0,0-5,5v9a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V10A5.006,5.006,0,0,0,19,5ZM12,20a6,6,0,1,1,6-6A6.006,6.006,0,0,1,12,20Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="profileUserDeatils">
          <h3>{data.name}</h3>
          <p>{data.gender}</p>
          <p>{data.city}</p>
          <p>
            {
              data.phone ? `+91` + data.phone : ``
            }
            
            </p>
          <p>{data.email}</p>
          <div className="addressProfile">
            <small onClick={() => tableShow("address")}>Saved Address</small>
          </div>

          <div className="editProfile">
            <p onClick={() => tableShow("order")}>Orders</p>
          </div>
          <div className="editProfile">
            <p onClick={() => tableShow("edit")}>Edit account information</p>
          </div>
        </div>
        {editdisplayBasic ? (
          <DialogBox
            displayBasic={editdisplayBasic}
            setDisplayBasic={setEditDisplayBasic}
            header={"Edit Personal Info"}
            type={"edit"}
            data={data}
          />
        ) : orderdisplayBasic ? (
          <DialogBox
            displayBasic={orderdisplayBasic}
            setDisplayBasic={setOrderDisplayBasic}
            header={"Orders"}
            type={"orders"}
            data={data}
          />
        ) : addressdisplayBasic ? (
          <DialogBox
            displayBasic={addressdisplayBasic}
            setDisplayBasic={setAddressDisplayBasic}
            header={"Address"}
            type={"address"}
            data={data}
          />
        ) : (
          ``
        )}
      </div>
    </div>
  );
};
export const DialogBox = ({
  displayBasic,
  setDisplayBasic,
  header,
  type,
  data,
}) => {
  const [formData, setformData] = useState({
    name: data.name,
    email: data.email,
    image: data.image,
    phone: data.phone,
    city: data.city,
    gender: data.gender,
    address: data.address,
    pincode: data.pincode,
    landmark: data.landmark,
  });

  const [loading, setLoading] = useState(false);

  const onHide = () => {
    setDisplayBasic(!displayBasic);
  };

  const editHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      axios
        .put(`${BaseUrl}/user/${data._id}`, formData)
        .then((res) => toast.success(res.data));
      setDisplayBasic(!displayBasic);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const handleChange = (prop) => (event) => {
    setformData({ ...formData, [prop]: event.target.value });
  };

  return (
    <div>
      <Dialog
        header={header}
        visible={displayBasic}
        style={{ width: "70vw", height: "80vh" }}
        onHide={() => onHide()}
      >
        {type === "edit" ? (
          <div className="editConatiner">
            <form onSubmit={(e) => editHandler(e)}>
              <Grid container spacing={2}>
                {editForm.map((data) => (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={3}
                    lg={3}
                    key={data.label}
                    className="editformConatiner"
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
              <div className="editBtn">
                <button type="submit" disabled={loading ? true : false}>
                  {loading ? "Processing..." : "Submit"}
                </button>
                <button onClick={() => onHide()}>Cancel</button>
              </div>
            </form>
          </div>
        ) : type === "orders" ? (
          <Orders />
        ) : (
          <Address />
        )}
      </Dialog>
    </div>
  );
};
export default Profile;
