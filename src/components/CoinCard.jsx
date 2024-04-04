import React from "react";
import { HashLink } from 'react-router-hash-link';

const CoinCard = ({ name, id, image, price, changePr }) => {
  return (
    <HashLink smooth to={`/coin/${id}#coin-details-main`}>
      <div className="coinCard">
        <img src={image} alt={"name"} />
        <h4>{name}</h4>
        <p>
          {price} (
          <span className={changePr > 0 ? "positive" : "negative"}>
            {changePr}
          </span>
          )
        </p>
      </div>
    </HashLink>
  );
};

export default CoinCard;
