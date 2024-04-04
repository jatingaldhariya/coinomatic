import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import CoinCard from "./CoinCard";
import axios from "axios";
import { server } from "../index";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Chart from "./Chart";
import { FaLink, FaTwitter, FaGoogle } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import "../styles/coindetails.scss";

const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const NormalFormatter = (num) => {
  const formatter = Intl.NumberFormat().format(num);
  if (num === null) {
    return "Undefined";
  }

  return formatter;
};

const MainFormatter = (value, currencyCode = "USD", locale = "en-US") => {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  });

  return formatter.format(value);
};

const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loder, setLoader] = useState(true);
  const [currency, setCurrency] = useState("usd");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);
  const [relatedCoins, setRelatedCoins] = useState([]);

  const currencySymbol =
    currency === "inr" ? "₹ " : currency === "eur" ? "€ " : "$ ";

  const params = useParams();

  const chartBtns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchTimeFram = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoader(true);
        break;

      case "7d":
        setDays("7d");
        setLoader(true);
        break;

      case "14d":
        setDays("14d");
        setLoader(true);
        break;

      case "30d":
        setDays("30d");
        setLoader(true);
        break;

      case "60d":
        setDays("60d");
        setLoader(true);
        break;

      case "200d":
        setDays("200d");
        setLoader(true);
        break;

      case "1y":
        setDays("365d");
        setLoader(true);
        break;

      case "max":
        setDays("max");
        setLoader(true);
        break;

      default:
        setDays("24h");
        setLoader(true);
        break;
    }
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);

        // Chart Data
        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );

        // Related Coins
        const { data: relatedCoinsData } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&per_page=5`
        );

        setChartArray(chartData.prices);
        setRelatedCoins(relatedCoinsData);
        console.log(relatedCoinsData);
        console.log(data);
        setCoin(data);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.log("My Error: " + error);
      }
    };

    fetchCoin();
  }, [params.id, currency, days]);

  return (
    <div>
      {loder ? (
        <Loader />
      ) : (
        <>
          <div id="coin-details-main" className="coin-details-main">
            <div className="container">
              <div className="top-row">
                <div className="coin-details">
                  <p className="breadcrumbs">
                    <Link to={"/coins"}>All Coins </Link> <span>/</span>{" "}
                    {coin.name}
                  </p>
                  <p className="update-detail">
                    Last Updated On: {Date().split("G")[0]}
                  </p>
                  <div className="coin-profile">
                    <img src={coin.image.large} alt={coin.name} />
                    <h3>{coin.name}</h3>
                    <h4>{coin.symbol}</h4>
                    <p>#{coin.market_cap_rank}</p>
                  </div>
                  <div className="coin-price">
                    <h2>
                      {MainFormatter(
                        coin.market_data.current_price[currency],
                        currency
                      )}
                    </h2>
                    <p
                      className={
                        NormalFormatter(
                          coin.market_data
                            .price_change_percentage_24h_in_currency[currency]
                        ) > 0
                          ? "positive"
                          : "negative"
                      }
                    >
                      {formatter.format(
                        coin.market_data
                          .price_change_percentage_24h_in_currency[currency]
                      )}
                      %
                    </p>
                  </div>
                  <div className="chart-container">
                    <div className="chart-btns">
                      <div className="currencySelector">
                        <select onChange={(e) => setCurrency(e.target.value)}>
                          <option value="usd">$</option>
                          <option value="inr">₹</option>
                          <option value="eur">€</option>
                        </select>
                      </div>
                      <div className="daySelector">
                        {chartBtns.map((i) => (
                          <button
                            key={i}
                            id={i}
                            onClick={() => switchTimeFram(i)}
                          >
                            {i}
                          </button>
                        ))}
                      </div>
                    </div>
                    <Chart
                      arr={chartArray}
                      currency={currencySymbol}
                      days={days}
                    />
                  </div>
                  <div className="infoRow">
                    <div className="coinDetails-cards">
                      <div className="market-data">
                        <h4>Market Info</h4>
                        <div className="data-row">
                          <h6>Market Cap</h6>
                          <p>
                            {MainFormatter(
                              coin.market_data.market_cap[currency],
                              currency
                            )}
                          </p>
                        </div>
                        <div className="data-row">
                          <h6>Fully Diluted Valuation </h6>
                          <p>
                            {MainFormatter(
                              coin.market_data.fully_diluted_valuation[
                                currency
                              ],
                              currency
                            )}
                          </p>
                        </div>
                        <div className="data-row">
                          <h6>Total Trading Vol</h6>
                          <p>
                            {MainFormatter(
                              coin.market_data.total_volume[currency],
                              currency
                            )}
                          </p>
                        </div>
                        <div className="data-row">
                          <h6>Circulating Supply</h6>
                          <p>
                            {NormalFormatter(
                              coin.market_data.circulating_supply
                            )}
                          </p>
                        </div>
                        <div className="data-row">
                          <h6>Total Supply</h6>
                          <p>
                            {NormalFormatter(coin.market_data.total_supply)}
                          </p>
                        </div>
                        <div className="data-row">
                          <h6>Max Supply</h6>
                          <p>{NormalFormatter(coin.market_data.max_supply)}</p>
                        </div>
                      </div>
                      <div className="coin-historical">
                        <h4>Historical Price Details</h4>
                        <div className="data-row">
                          <h6>24h Range</h6>
                          <p>
                            {MainFormatter(
                              coin.market_data.high_24h[currency],
                              currency
                            )}{" "}
                            -{" "}
                            {MainFormatter(
                              coin.market_data.low_24h[currency],
                              currency
                            )}
                          </p>
                        </div>

                        <div className="data-row">
                          <h6>Lifetime High</h6>
                          <p className="lifetimefigure">
                            {MainFormatter(
                              coin.market_data.ath[currency],
                              currency
                            )}
                            <div
                              className={
                                coin.market_data.ath_change_percentage[
                                  currency
                                ] > 0
                                  ? "positive"
                                  : "negative"
                              }
                            >
                              {formatter.format(
                                coin.market_data.ath_change_percentage[currency]
                              )}
                              %
                            </div>
                          </p>
                        </div>
                        <div className="data-row">
                          <h6>Lifetime Low</h6>
                          <p className="lifetimefigure">
                            {MainFormatter(
                              coin.market_data.atl[currency],
                              currency
                            )}
                            <div
                              className={
                                coin.market_data.atl_change_percentage[
                                  currency
                                ] > 0
                                  ? "positive"
                                  : "negative"
                              }
                            >
                              {formatter.format(
                                coin.market_data.atl_change_percentage[currency]
                              )}
                              %
                            </div>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="coinDetails-section">
                      <div className="coin-info">
                        <h4 className="info-headding">Info</h4>
                        <div className="data-row">
                          <h6>Website:</h6>
                          <div className="imp-links">
                            <a href={coin.links.homepage} target="_blank">
                              <FaLink />
                              {coin.id}
                            </a>
                          </div>
                        </div>
                        <div className="data-row">
                          <h6>Community:</h6>
                          <div className="imp-links">
                            <a
                              href={
                                "https://twitter.com/" +
                                coin.links.twitter_screen_name
                              }
                              target="_blank"
                            >
                              <FaTwitter />
                              {coin.links.twitter_screen_name}
                            </a>
                          </div>
                        </div>
                        <div className="data-row">
                          <h6>Search on:</h6>
                          <div className="imp-links">
                            <a
                              href={
                                "https://www.google.com/search?q=" + coin.id
                              }
                              target="_blank"
                            >
                              <FaGoogle />
                            </a>
                            <a
                              href={"https://twitter.com/search?q=" + coin.id}
                              target="_blank"
                            >
                              <FaTwitter />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="past-performance">
                        <h4 className="info-headding">Past Performance</h4>
                        <div className="performance-details">
                          <div
                            className={
                              NormalFormatter(
                                coin.market_data
                                  .price_change_percentage_7d_in_currency[
                                  currency
                                ]
                              ) > 0
                                ? "per-wrapper p-wrapper"
                                : "per-wrapper n-wrapper"
                            }
                          >
                            <h3
                              className={
                                NormalFormatter(
                                  coin.market_data
                                    .price_change_percentage_7d_in_currency[
                                    currency
                                  ]
                                ) > 0
                                  ? "positive"
                                  : "negative"
                              }
                            >
                              {formatter.format(
                                coin.market_data
                                  .price_change_percentage_7d_in_currency[
                                  currency
                                ]
                              )}
                              %
                            </h3>
                            <h5 className="performance-days">7 D</h5>
                          </div>
                          <div
                            className={
                              NormalFormatter(
                                coin.market_data
                                  .price_change_percentage_14d_in_currency[
                                  currency
                                ]
                              ) > 0
                                ? "per-wrapper p-wrapper"
                                : "per-wrapper n-wrapper"
                            }
                          >
                            <h3
                              className={
                                NormalFormatter(
                                  coin.market_data
                                    .price_change_percentage_14d_in_currency[
                                    currency
                                  ]
                                ) > 0
                                  ? "positive"
                                  : "negative"
                              }
                            >
                              {formatter.format(
                                coin.market_data
                                  .price_change_percentage_14d_in_currency[
                                  currency
                                ]
                              )}
                              %
                            </h3>
                            <h5 className="performance-days">14 D</h5>
                          </div>
                          <div
                            className={
                              NormalFormatter(
                                coin.market_data
                                  .price_change_percentage_30d_in_currency[
                                  currency
                                ]
                              ) > 0
                                ? "per-wrapper p-wrapper"
                                : "per-wrapper n-wrapper"
                            }
                          >
                            <h3
                              className={
                                NormalFormatter(
                                  coin.market_data
                                    .price_change_percentage_30d_in_currency[
                                    currency
                                  ]
                                ) > 0
                                  ? "positive"
                                  : "negative"
                              }
                            >
                              {formatter.format(
                                coin.market_data
                                  .price_change_percentage_30d_in_currency[
                                  currency
                                ]
                              )}
                              %
                            </h3>
                            <h5 className="performance-days">30 D</h5>
                          </div>
                          <div
                            className={
                              NormalFormatter(
                                coin.market_data
                                  .price_change_percentage_60d_in_currency[
                                  currency
                                ]
                              ) > 0
                                ? "per-wrapper p-wrapper"
                                : "per-wrapper n-wrapper"
                            }
                          >
                            <h3
                              className={
                                NormalFormatter(
                                  coin.market_data
                                    .price_change_percentage_60d_in_currency[
                                    currency
                                  ]
                                ) > 0
                                  ? "positive"
                                  : "negative"
                              }
                            >
                              {formatter.format(
                                coin.market_data
                                  .price_change_percentage_60d_in_currency[
                                  currency
                                ]
                              )}
                              %
                            </h3>
                            <h5 className="performance-days">60 D</h5>
                          </div>
                          <div
                            className={
                              NormalFormatter(
                                coin.market_data
                                  .price_change_percentage_200d_in_currency[
                                  currency
                                ]
                              ) > 0
                                ? "per-wrapper p-wrapper"
                                : "per-wrapper n-wrapper"
                            }
                          >
                            <h3
                              className={
                                NormalFormatter(
                                  coin.market_data
                                    .price_change_percentage_200d_in_currency[
                                    currency
                                  ]
                                ) > 0
                                  ? "positive"
                                  : "negative"
                              }
                            >
                              {formatter.format(
                                coin.market_data
                                  .price_change_percentage_200d_in_currency[
                                  currency
                                ]
                              )}
                              %
                            </h3>
                            <h5 className="performance-days">200 D</h5>
                          </div>
                          <div
                            className={
                              NormalFormatter(
                                coin.market_data
                                  .price_change_percentage_1y_in_currency[
                                  currency
                                ]
                              ) > 0
                                ? "per-wrapper p-wrapper"
                                : "per-wrapper n-wrapper"
                            }
                          >
                            <h3
                              className={
                                NormalFormatter(
                                  coin.market_data
                                    .price_change_percentage_1y_in_currency[
                                    currency
                                  ]
                                ) > 0
                                  ? "positive"
                                  : "negative"
                              }
                            >
                              {formatter.format(
                                coin.market_data
                                  .price_change_percentage_1y_in_currency[
                                  currency
                                ]
                              )}
                              %
                            </h3>
                            <h5 className="performance-days">1 Y</h5>
                          </div>
                        </div>
                      </div>
                      <div className="market-sentimates">
                        <h4 className="info-headding">
                          How do people feel about {coin.name} today?
                        </h4>
                        <div>
                          <p>
                            <FaArrowTrendUp className="positive" />{" "}
                            {coin.sentiment_votes_up_percentage}%
                          </p>
                          <p>
                            <FaArrowTrendDown className="negative" />{" "}
                            {coin.sentiment_votes_down_percentage}%
                          </p>
                        </div>
                      </div>
                      <div className="coin-categories">
                        <h4 className="info-headding">Categories</h4>
                        <div>
                          <p>{coin.categories[0]}</p>
                          <p>{coin.categories[1]}</p>
                          <p>{coin.categories[2]}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="related-coins">
            <h4>Related Coins</h4>
            {relatedCoins
              .slice(0, 4)
              .map(
                (i) =>
                  i.id !== params.id && (
                    <CoinCard
                      key={i.id}
                      id={i.id}
                      price={MainFormatter(i.current_price, currency)}
                      changePr={formatter.format(
                        i.market_cap_change_percentage_24h
                      )}
                      name={i.name}
                      image={i.image}
                    />
                  )
              )}
          </div>
        </>
      )}
    </div>
  );
};

export default CoinDetails;
