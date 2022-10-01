import React, { useEffect, useState } from "react";
import AlertPop from "./AlertPop";
import { Dialog } from "primereact/dialog";
import { Image } from "primereact/image";
import useFetch from "../../../hooks/useFetch";

const DialogBox = ({
  displayBasic,
  setDisplayBasic,
  geturl,
  deleteurl,
  section,
}) => {
  const [visible, setVisible] = useState(false);
  const [id, setID] = useState();
  const { data, error, loading, reFetch } = useFetch(geturl);
  const onHide = () => {
    setDisplayBasic(!displayBasic);
  };
  useEffect(() => {
    reFetch();
  }, [displayBasic]);

  const confirmHandler = (id) => {
    setVisible(true);
    setID(id);
  };
  return (
    <div>
      <Dialog
        header={section + "s"}
        visible={displayBasic}
        style={{ width: "50vw" }}
        onHide={() => onHide()}
      >
        <table className="table brandTable">
          <thead>
            <tr style={{ borderStyle: "none" }}>
              <th scope="col">#</th>
              {section === "Brand" || section === "Category" || section === "subcategory" ? (
                <>
                  <th scope="col">{section} Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Action</th>
                </>
              ) : (
                <>
                  <th scope="col">{section} Name</th>

                  <th scope="col">Action</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              <tr style={{ borderStyle: "none" }} key={data._id}>
                <th scope="row">{index + 1}</th>
                {section === "Brand" ? (
                  <>
                    <td>{data.brandname}</td>
                    <td>
                      <Image src={data.image} alt="Image" width="35" preview />
                    </td>
                  </>
                ) : section === "Color" ? (
                  <td>{data.colorname}</td>
                ) : section === "Category" ? (
                  <>
                    <td>{data.categoryname}</td>
                    <td>
                      <Image src={data.image} alt="Image" width="35" preview />
                    </td>
                  </>
                ) : section === "Subcategory" ? (
                  <>
                  <td>{data.subcategoryname}</td>
                  <td>
                      <Image src={data.image} alt="Image" width="35" preview />
                    </td>
                  </>
                ) : section === "Fabric" ? (
                  <td>{data.fabricname}</td>
                ) : section === "Fit" ? (
                  <td>{data.fitname}</td>
                ) : section === "Multipack" ? (
                  <td>{data.multipackname}</td>
                ) : section === "Neck" ? (
                  <td>{data.neckname}</td>
                ) : section === "Occasion" ? (
                  <td>{data.occasionname}</td>
                ) : (
                  <td></td>
                )}

                <td>
                  <button>
                    <svg fill="currentColor" viewBox="24 24">
                      <path d="M18.656.93,6.464,13.122A4.966,4.966,0,0,0,5,16.657V18a1,1,0,0,0,1,1H7.343a4.966,4.966,0,0,0,3.535-1.464L23.07,5.344a3.125,3.125,0,0,0,0-4.414A3.194,3.194,0,0,0,18.656.93Zm3,3L9.464,16.122A3.02,3.02,0,0,1,7.343,17H7v-.343a3.02,3.02,0,0,1,.878-2.121L20.07,2.344a1.148,1.148,0,0,1,1.586,0A1.123,1.123,0,0,1,21.656,3.93Z" />
                      <path d="M23,8.979a1,1,0,0,0-1,1V15H18a3,3,0,0,0-3,3v4H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2h9.042a1,1,0,0,0,0-2H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H16.343a4.968,4.968,0,0,0,3.536-1.464l2.656-2.658A4.968,4.968,0,0,0,24,16.343V9.979A1,1,0,0,0,23,8.979ZM18.465,21.122a2.975,2.975,0,0,1-1.465.8V18a1,1,0,0,1,1-1h3.925a3.016,3.016,0,0,1-.8,1.464Z" />
                    </svg>
                  </button>

                  <button onClick={() => confirmHandler(data._id)}>
                    <svg fill="currentColor" viewBox="24 24 ">
                      <path d="M15.207,14.207,13.414,16l1.793,1.793a1,1,0,1,1-1.414,1.414L12,17.414l-1.793,1.793a1,1,0,0,1-1.414-1.414L10.586,16,8.793,14.207a1,1,0,0,1,1.414-1.414L12,14.586l1.793-1.793a1,1,0,0,1,1.414,1.414ZM22,10.485V19a5.006,5.006,0,0,1-5,5H7a5.006,5.006,0,0,1-5-5V5A5.006,5.006,0,0,1,7,0h4.515a6.958,6.958,0,0,1,4.95,2.05l3.484,3.486A6.951,6.951,0,0,1,22,10.485ZM15.051,3.464A5.01,5.01,0,0,0,14,2.684V7a1,1,0,0,0,1,1h4.316a4.983,4.983,0,0,0-.781-1.05ZM20,10.485c0-.165-.032-.323-.047-.485H15a3,3,0,0,1-3-3V2.047C11.838,2.032,11.679,2,11.515,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3Z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <AlertPop
          reFetch={reFetch}
          visible={visible}
          setVisible={setVisible}
          id={id}
          //   url={"/feature/brand"}
          url={deleteurl}
        />
      </Dialog>
    </div>
  );
};

export default DialogBox;
