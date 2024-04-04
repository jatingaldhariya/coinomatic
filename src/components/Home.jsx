import React, { useEffect, useState } from "react";
import "../styles/home.scss";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import News from "./News";
import { Link } from "react-router-dom";

import coinImg from "../assets/bitcoinnobg.png";
import axios from "axios";
import { server, server2 } from "../index";

import { FaFire } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";
import { RiNftFill } from "react-icons/ri";

const Home = () => {
  const [globalStatics, setGlobalStatics] = useState([]);
  const [loder, setLoader] = useState(true);
  const [marketCap, setMarketCap] = useState("Unble To Fetch");
  const [marketCapCnahgPr, setMarketCapCnahgPr] = useState("UTF");
  const [volume24, setVolume24] = useState("Unble To Fetch");
  const [coins, setCoins] = useState("Unble To Fetch");
  const [markets, setMarkets] = useState("Unble To Fetch");
  const [error, setError] = useState(false);
  const [allCoins, setAllCoins] = useState([]);
  const [trendingCoins, setTrencingCoins] = useState([]);
  const [nfts, setNfts] = useState([]);

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  const MainFormatter = (value, currencyCode = "USD", locale = "en-US") => {
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
    });

    return formatter.format(value);
  };

  useEffect(() => {
    const API_KEY = "f5LfdPLcOwp+3GZiPUX6mpk6prX3FZaSELoAKcICjDo=";
    const fetchGlobaldta = async () => {
      try {
        const { data } = await axios.get(`${server}/global`);
        setGlobalStatics(data.data);
        setMarketCap(globalStatics.total_market_cap.usd);
        setVolume24(globalStatics.total_volume.btc);
        setCoins(globalStatics.active_cryptocurrencies);
        setMarkets(globalStatics.markets);
        setMarketCapCnahgPr(globalStatics.market_cap_change_percentage_24h_usd);

        const percentageColor = document.getElementById("change-percentage");

        if (marketCapCnahgPr < 0) {
          percentageColor.style.color = "red";
        } else {
          percentageColor.style.color = "green";
        }

        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.log("Error:" + error);
      }
    };

    // Fetch All Coins
    const fetchAllCoins = async () => {
      try {
        const response = await axios.get(`${server2}/coins`, {
          headers: {
            "X-API-KEY": API_KEY,
          },
        });
        setAllCoins(response.data.result);

        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.error("Error fetching data:", error);
      }
    };
    // Fetch trending Coins And Nfts
    const fetchTrendings = async () => {
      try {
        const { data: trending } = await axios.get(`${server}/search/trending`);
        setTrencingCoins(trending.coins);

        setNfts(trending.nfts);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.log("Error:" + error);
      }
    };

    fetchAllCoins();
    fetchTrendings();

    fetchGlobaldta();
  }, []);

  if (error) {
    return <ErrorComponent />;
  } else {
    return (
      <div id="home" className="home-main">
        <div className="hero-section">
          <div className="hero-content">
            <h2 className="tagline">
              Cryptocurrency Insights <br /> At Your Fingertips.
            </h2>
            <p>Track every crypto move with us.</p>
            <Link to={"/coins"}>Track Now</Link>
          </div>
          <div className="hero-banner">
            <img src={coinImg} alt="" />
          </div>
        </div>

        <div className="market-trends">
          {loder ? (
            <Loader />
          ) : (
            <>
              <div className="trends-primary">
                <div>
                  <h4>${Intl.NumberFormat().format(marketCap)}</h4>
                  <h5>
                    Market Cap (
                    <span className="change-per" id="change-percentage">
                      {Intl.NumberFormat().format(marketCapCnahgPr)}%
                    </span>
                    )
                  </h5>
                </div>
                <div>
                  <h4>${Intl.NumberFormat().format(volume24)}</h4>
                  <h5>24h Trading Volume</h5>
                </div>
                <div>
                  <h4>{Intl.NumberFormat().format(coins)}</h4>
                  <h5>Total Coins</h5>
                </div>
                <div>
                  <h4>{Intl.NumberFormat().format(markets)}</h4>
                  <h5>Total Exchanges</h5>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="trend-board">
          <div id="Trending-Coins" className="trending-coins">
            <h4>
              Trending Coins <FaFire />
            </h4>
            <div className="list-table">
              <table className="home-list">
                {trendingCoins.map((i, index) => (
                  <tr key={i.item.id} className="list-row">
                    <td>{index + 1}</td>
                    <td className="coin-info">
                      <Link to={`/coin/${i.item.id}`}>
                        <img src={i.item.thumb} alt={i.item.name} />{" "}
                        {i.item.name}
                      </Link>
                    </td>
                    <td className="coin-price">
                      {MainFormatter(i.item.data.price)}(
                      <span
                        className={
                          formatter.format(
                            i.item.data.price_change_percentage_24h["usd"]
                          ) > 0
                            ? "positive"
                            : "negative"
                        }
                      >
                        {formatter.format(
                          i.item.data.price_change_percentage_24h["usd"]
                        )}
                        %
                      </span>
                      )
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
          <div id="All-Coins" className="popular-coins">
            <h4>
              <Link to={"./coins"}>
                All Coins <GiTwoCoins />
              </Link>
            </h4>
            <div className="list-table">
              <table className="home-list">
                {allCoins.map((i, index) => (
                  <tr key={i.id} className="list-row">
                    <td>{index + 1}</td>
                    <td className="coin-info">
                      <Link to={`/coin/${i.id}`}>
                        <img src={i.icon} alt={i.name} /> {i.name}
                      </Link>
                    </td>
                    <td className="coin-price">
                      {MainFormatter(i.price)}(
                      <span
                        className={
                          formatter.format(i.priceChange1d) > 0
                            ? "positive"
                            : "negative"
                        }
                      >
                        {formatter.format(i.priceChange1d)}%
                      </span>
                      )
                    </td>
                  </tr>
                ))}
                <tr className="list-row">
                  <td></td>
                  <td className="viewAll">
                    <Link to={"/coins"}>View All </Link>
                  </td>
                  <td></td>
                </tr>
              </table>
            </div>
          </div>
          <div id="Nfts" className="top-nfts">
            <h4>
              Nfts <RiNftFill />
            </h4>
            <div className="list-table">
              <table className="home-list">
                {nfts.map((i, index) => (
                  <tr key={i.id} className="list-row">
                    <td>{index + 1}</td>
                    <td className="coin-info">
                      <a
                        href={`https://www.coingecko.com/en/nft/${i.id}`}
                        target="_blank"
                      >
                        <img src={i.thumb} alt={i.name} /> {i.name}
                      </a>
                    </td>
                    <td className="coin-price">{i.data.floor_price}</td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
        <div className="news">
          <News />
        </div>

        <div id="aboutUs" className="aboutus">
          <h4>About Us</h4>
          <p>
            Coinomatic is your one-stop shop for everything crypto. We're a
            passionate team dedicated to providing you with the latest
            information, in-depth analysis, and educational resources you need
            to navigate the ever-changing world of cryptocurrencies, exchanges,
            and NFTs. Whether you're a seasoned investor looking for the hottest
            market trends or a complete beginner curious about the potential of
            blockchain technology, Coinomatic empowers you to make informed
            decisions and participate in the exciting world of digital assets.
          </p>
          <p>
            Stay ahead of the curve with Coinomatic. Our team of crypto experts
            curates the latest news, analysis, and educational resources on all
            things cryptocurrency, exchanges, and NFTs. From in-depth market
            reports to beginner-friendly guides, we're committed to providing
            the knowledge you need to succeed in the digital asset market.
          </p>
        </div>

        <div id="contactUs" className="contactus">
          <div className="mask">
            <h2>We are here to help you!</h2>
            <a href="mailto:xyz@gmail.com">Contact Us!</a>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
