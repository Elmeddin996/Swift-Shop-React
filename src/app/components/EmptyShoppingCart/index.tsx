import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { EQueryKeys } from "../../../enums";
import { useService } from "../../../APIs/Services";
import './style.scss'

export const EmptyShoppingCart =()=>{
    const { siteDatasService } = useService();
    const { data: siteDatas } = useQuery([EQueryKeys.GET_SITE_DATAS], () =>
    siteDatasService.getSiteDatas()
  );

  return (
    <div className="flex-container">
      <div className="image-container">
        <img
          className="rounded-image"
          src={siteDatas?.data.emptyCartImgUrl}
          alt="emptyCart"
        />
      </div>
      <div className="empty-card-container">
        <h1 className="title">
          YOUR CART FEELS LONELY.
        </h1>
        <p className="description">
          Your Shopping cart lives to serve. Give it
          purpose - fill it with electronics. and make it happy.
        </p>
        <Link to="/shop" className="link-button">
            Continue Shopping
        </Link>
      </div>
    </div>
  );
}