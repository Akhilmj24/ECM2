import React, { useState } from "react";
import "./productOrder.scss";
import { Steps } from "primereact/steps";

import Address from "../../pages/Address/Address";
import Payment from "../../core/Payment";
import OrderDone from "../../core/OrderDone";
const ProductOrder = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [transactionDone, settransactionDone] = useState();
  const [isCOD, setisCOD] = useState(true);

  const items = [
    {
      label: "Address",
    },
    {
      label: "Payment",
    },
    {
      label: "Confirmation",
    },
  ];

  return (
    <div className="productorderConatiner">
      <div className="card">
        <Steps model={items} activeIndex={activeIndex} />

        {activeIndex === 0 ? (
          <Address
            setActiveIndex={setActiveIndex}
            setTotalPrice={setTotalPrice}
            setSelectedAddress={setSelectedAddress}
            setisCOD={setisCOD}
          />
        ) : activeIndex === 1 ? (
          <Payment
            totalPrice={totalPrice}
            selectedAddress={selectedAddress}
            setActiveIndex={setActiveIndex}
            settransactionDone={settransactionDone}
          />
        ) : activeIndex === 2 ? (
          <OrderDone
            selectedAddress={selectedAddress}
            isCOD={isCOD}
            totalPrice={totalPrice}
            transactionDone={transactionDone}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ProductOrder;
