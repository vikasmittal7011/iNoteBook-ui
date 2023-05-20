import React from "react";
import loading from "./images/loading.gif";
function Loading() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <img src={loading} alt="Loading..." />
    </div>
  );
}

export default Loading;
