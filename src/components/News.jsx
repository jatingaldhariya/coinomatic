import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import { server2 } from "..";
import Slider from "react-slick";

const News = () => {
  const [news, setNews] = useState([]);
  const [loder, setLoader] = useState(true);

  var sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 8000,
    cssEase: "linear",
    initialSlide: 0,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const API_KEY = "f5LfdPLcOwp+3GZiPUX6mpk6prX3FZaSELoAKcICjDo=";
    const url = `${server2}/news`;

    const fetchNews = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            "X-API-KEY": API_KEY,
          },
        });
        console.log(response.data.result);
        setNews(response.data.result);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <div className="news-container">
        <h4>Latest News 📰 </h4>

        <div className="news-cards">
          <div className="slider-container">
            <Slider {...sliderSettings}>
              {loder ? (
                <Loader />
              ) : (
                news
                  .slice(0, 12)
                  .map((i) => (
                    <NewsCard
                      key={i}
                      title={i.title}
                      image={i.imgUrl}
                      url={i.link}
                      relatedCoins={i.relatedCoins}
                    />
                  ))
              )}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

const NewsCard = ({ title, image, url, relatedCoins }) => {
  return (
    <div className="news-card">
      <img src={image} alt={title} />
      <div className="news-content">
        <h4>{title}</h4>
        <div className="coinbadges">
          {relatedCoins.map((coin, index) => (
            <p key={index}>{coin}</p>
          ))}
        </div>
        <a href={url} target="_blank">
          Read More{" "}
        </a>
      </div>
    </div>
  );
};

export default News;
