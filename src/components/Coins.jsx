import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../index.js";

import { Link } from "react-router-dom";

import Loader from "./Loader.jsx";
import "../styles/coins.scss";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loder, setLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹ " : currency === "eur" ? "€ " : "$ ";

  const changePage = (page) => {
    setPage(page);
    setLoader(true);
  };

  const pagebtns = new Array(133).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.log("My Error: " + error);
      }
    };

    fetchCoins();
  }, [currency, page]);

  return (
    <>
      <div className="pageInfo">
        <h3>All Coins</h3>
      </div>
      <div className="currencySelector">
        <p>Currency:</p> 
        <select onChange={(e) => setCurrency(e.target.value)}>
          <option value="inr">₹</option>
          <option value="usd">$</option>
          <option value="eur">€</option>
        </select>
      </div>

      <div className="coins-main">
        <table className="coins-info-table">
          <tr className="conHeadings">
            <th>#</th>
            <th>Coin</th>
            <th>Price</th>
            <th>24h Volume</th>
            <th>Market Cap</th>
          </tr>
          {loder ? (
            <Loader />
          ) : (
            coins.map((i) => (
              <CoinRow
                index={i.market_cap_rank}
                id={i.id}
                key={i.id}
                name={i.name}
                symbol={i.symbol}
                image={i.image}
                price={Intl.NumberFormat().format(i.current_price)}
                changePr24={Intl.NumberFormat().format(
                  i.price_change_percentage_24h
                )}
                volume24={Intl.NumberFormat().format(i.total_volume)}
                marketcap={Intl.NumberFormat().format(i.market_cap)}
                currencySymbol={currencySymbol}
                prStatus={
                  Intl.NumberFormat().format(i.price_change_percentage_24h) > 0
                    ? "positive"
                    : "negative"
                }
              />
            ))
          )}
        </table>
      </div>
      <div className="pagination">
        {pagebtns.map((item, index) => (
          <button key={index} onClick={() => changePage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

const CoinRow = ({
  id,
  index,
  name,
  image,
  symbol,
  price,
  changePr24,
  volume24,
  marketcap,
  currencySymbol,
  prStatus,
}) => {
  return (
    <tr className="coinRow">
      <td>{index}</td>
      <td className="coin-profile">
        <Link to={`/coin/${id}`}>
          <img className="coin-image" src={image} alt={name} />
          <p className="coin-name">{name}</p>
          <p className="coin-symbol">({symbol})</p>
        </Link>
      </td>
      <td className="coin-price">
        {currencySymbol}
        {price} <br />
        <span>
          (<div className={prStatus}>{changePr24}%</div>)
        </span>
      </td>
      <td>
        {currencySymbol}
        {volume24}
      </td>
      <td>
        {currencySymbol}
        {marketcap}
      </td>
    </tr>
  );
};

export default Coins;
