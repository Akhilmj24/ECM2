import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import { dataDrop } from "./dropdownOptions";

const Input = ({ type, value, options, onChange, dropdownValue }) => {
  const [option, setoptios] = useState();
  const [dropDownvalue, setdropDownValue] = useState();

  useEffect(() => {
    if (options === "brand") {
      dataDrop("brand", "brandname").then((res) => setdropDownValue(res));
    } else if (options === "colorname") {
      dataDrop("color").then((res) => setdropDownValue(res));
    } else if (options === "category") {
      dataDrop("category").then((res) => setdropDownValue(res));
    } else if (options === "subcategory") {
      dataDrop("subcategory").then((res) => setdropDownValue(res));
    } else if (options === "fabric") {
      dataDrop("fabric").then((res) => setdropDownValue(res));
    } else if (options === "fit") {
      dataDrop("fit").then((res) => setdropDownValue(res));
    } else if (options === "multipack") {
      dataDrop("multipack").then((res) => setdropDownValue(res));
    } else if (options === "neck") {
      dataDrop("neck").then((res) => setdropDownValue(res));
    } else if (options === "occasion") {
      dataDrop("occasion").then((res) => setdropDownValue(res));
    }
  }, []);

  useEffect(() => {
    if (options === "gender") {
      setoptios([
        { value: "Male", code: "Male" },
        { value: "Female", code: "Female" },
        { value: "Others", code: "Others" },
      ]);
    } else if (options === "brand") {
      setoptios(dropDownvalue);
    } else if (options === "category") {
      setoptios(dropDownvalue);
    } else if (options === "subcategory") {
      setoptios(dropDownvalue);
    } else if (options === "fabric") {
      setoptios(dropDownvalue);
    } else if (options === "multipack") {
      setoptios(dropDownvalue);
    } else if (options === "neck") {
      setoptios(dropDownvalue);
    } else if (options === "fit") {
      setoptios(dropDownvalue);
    } else if (options === "occasion") {
      setoptios(dropDownvalue);
    } else if (options === "colorname") {
      setoptios(dropDownvalue);
    }
  }, [dropDownvalue]);

  return (
    <>
      {type === "dropdown" ? (
        <Dropdown
          optionLabel="value"
          optionValue="code"
          value={
            value === "gender"
              ? dropdownValue?.gender
              : value === "nationality"
              ? dropdownValue?.nationality
              : value === "marital Status"
              ? dropdownValue?.maritalStatus
              : value === "brand"
              ? dropdownValue?.brand
              : value === "category"
              ? dropdownValue?.category
              : value === "fabric"
              ? dropdownValue?.fabric
              : value === "multi pack"
              ? dropdownValue?.multipack
              : value === "neck"
              ? dropdownValue?.neck
              : value === "fit"
              ? dropdownValue?.fit
              : value === "occasion"
              ? dropdownValue?.occasion
              : value === "color"
              ? dropdownValue?.colorname
              : value === "sub category"
              ? dropdownValue?.subcategory
              : value === "state"
              ? dropdownValue?.state
              : value === "Gender"
              ? dropdownValue?.gender
              : ""
          }
          options={option}
          onChange={onChange}
          placeholder={value}
        />
      ) : type === "number" ? (
        <InputText
          onChange={onChange}
          placeholder={value}
          type="number"
          value={
            value === "price"
              ? dropdownValue?.price
              : value === "count In Stock"
              ? dropdownValue?.countInStock
              : value === "strike price"
              ? dropdownValue?.strikeprice
              : value === "Phone"
              ? dropdownValue?.phone
              : value === "Pincode"
              ? dropdownValue?.pincode
              : ""
          }
        />
      ) : type === "date" ? (
        <InputText onChange={onChange} placeholder={value} type="date" />
      ) : type === "email" ? (
        <InputText onChange={onChange} placeholder={value} type="email" />
      ) : (
        <InputText
          onChange={onChange}
          placeholder={value}
          value={
            value === "Product Name"
              ? dropdownValue?.name
              : value === "description"
              ? dropdownValue?.description
              : value === "Product id"
              ? dropdownValue?.productid
              : value === "price"
              ? dropdownValue?.price
              : value === "countInStock"
              ? dropdownValue?.countInStock
              : value === "strikeprice"
              ? dropdownValue?.strikeprice
              : value === "Name"
              ? dropdownValue?.name
              : value === "Email"
              ? dropdownValue?.email
              : value === "City"
              ? dropdownValue?.city
              : value === "Address Line"
              ? dropdownValue?.address
              : value === "Landmark"
              ? dropdownValue?.landmark
              : ""
          }
        />
      )}
    </>
  );
};

export default Input;
