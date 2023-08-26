import React from "react";
import "./style.scss";
import { InfinitySpin } from "react-loader-spinner";

export const Loading = () => {
  return (
    <div className="loading-spin">
      <InfinitySpin width="200"  color="#4fa94d" />
    </div>
  );
};
