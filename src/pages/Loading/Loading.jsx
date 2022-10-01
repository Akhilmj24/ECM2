import React from "react";
import "./loading.scss";

function Loading() {
  return (
    <div className="loadingConatiner">
      <div className="wrapper">
        <span className="dot"></span>
        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default Loading;
