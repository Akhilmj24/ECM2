import { Grid } from "@mui/material";
import axios from "axios";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "../../Admin/components/Const/Input";
import useFetch from "../../hooks/useFetch";
import { BaseUrl } from "../../utils/Service";
import { addresseditForm } from "./editForm";

const AddAddress = ({
  displayBasic,
  setDisplayBasic,
  id,
  header,
  editForm,
  type,
}) => {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const { data, reFetch } = useFetch(`/address/find/${id}`);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setformData] = useState({
    userID:userInfo.details._id,
    address: "",
    pincode: "",
    landmark: "",
    name: "",
    phone: "",
  });

  useEffect(() => {
    if (type === "edit") {
      setVisible(true);
    }
  }, [editForm]);
  const confirmAccept = () => {
    setformData({
      address: data.address,
      pincode: data.pincode,
      landmark: data.landmark,
    });
    setVisible(false);
  };
  const onHide = () => {
    setDisplayBasic(!displayBasic);
  };

  const editHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (type === "edit") {
      try {
        axios
          .put(`${BaseUrl}/address/${id}`, formData)
          .then((res) => toast.success(res.data))
          .then(reFetch());
        setDisplayBasic(!displayBasic);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("adding");

      try {
        axios
          .post(`${BaseUrl}/address/addaddress`, formData)
          .then((res) => toast.success(res.data))
          .then(reFetch())
          .then(setDisplayBasic(!displayBasic));
      } catch (error) {
        console.log(error);
      }
    }

    setLoading(false);
  };
  const handleChange = (prop) => (event) => {
    setformData({ ...formData, [prop]: event.target.value });
  };
  
  return (
    <div>
      <Dialog
        header={`${header} Address`}
        visible={displayBasic}
        style={{ width: "70vw", height: "80vh" }}
        onHide={() => onHide()}
      >
        <div className="editConatiner">
          <form onSubmit={(e) => editHandler(e)}>
            <Grid container spacing={2}>
              {addresseditForm.map((data) => (
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

              <p onClick={onHide}>Cancel</p>
            </div>
          </form>
        </div>
      </Dialog>
      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        message="Are you sure you want to proceed?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={confirmAccept}
        reject={() => setDisplayBasic(!displayBasic)}
      />
    </div>
  );
};

export default AddAddress;
