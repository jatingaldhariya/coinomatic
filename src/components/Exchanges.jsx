import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../index.js";

import Loader from "./Loader.jsx";

import "../styles/exchanges.scss";
import ErrorComponent from "./ErrorComponent.jsx";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loder, setLoader] = useState(true);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges?per_page=250`);
        setExchanges(data);
        setLoader(false);
        console.log(data);
      } catch (error) {
        setLoader(false);
        console.log("My Error: " + error);
      }
    };

    fetchExchanges();
  }, []);

  return (
    <>
      <div className="pageInfo">
        <h3>All Exchanges</h3>
      </div>
      <h5 className="exchangesCount">Top 250 Exchanges</h5>
      <div className="exchanges-main">
        {loder ? (
          <Loader />
        ) : (
          exchanges.map((i) => (
            <ExchangeCard
              key={i.id}
              name={i.name}
              image={i.image}
              url={i.url}
              rank={i.trust_score_rank}
            />
          ))
        )}
      </div>
    </>
  );
};

const ExchangeCard = ({ name, image, url, rank }) => {
  return (
    <a href={url} target="_blank">
      <div className="exchangeCard">
        <img src={image} alt={name} />
        <h4>{name}</h4>
        <p>Rank:{rank}</p>
      </div>
    </a>
  );
};

export default Exchanges;
