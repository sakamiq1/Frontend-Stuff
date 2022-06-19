import "./homepage.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchToolsAsync, getTools } from "../../../features/tools/toolSlice";
import ProductCard from "../../ProductCard/ProductCard";
import { Carousel } from "antd";

const HomePage = () => {
  const listTools = useSelector(getTools);
  const dispatch = useDispatch();
  const settings = {
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  useEffect(() => {
    dispatch(fetchToolsAsync());
  }, [dispatch]);

  return (
    <div>
      <div className="home-page-div">
        <div className="banner-div">
          <img src="/Pictures/sample2.jpg" alt='banner-img' className="main-sample-img" />
          <img src="/Pictures/sample5.png" alt='banner-img' className="left-sample-img" />
          <img src="/Pictures/sample6.png" alt='banner-img' className="right-sample-img" />
          <div className="greeting-div">
            <img src="/Pictures/616430.png" alt="cat icon tool online" />
            <h1 className="greeting-tag">Welcome to Tool Online shop</h1>
          </div>
        </div>
        <div className="media-scroller-wrapper">
          <Carousel autoplay {...settings}>
            {listTools.results &&
              listTools.results.map((tool) => (
                <ProductCard item={tool} flag="short" />
              ))}
          </Carousel>
        </div>
        <div className="contact-div">
          <h1>liên kết với chúng tôi</h1>
          <hr />
          <div className="widget-wrap">
            <div className="widget-item">
              <div className="facebook-img-link">
                <a href="https://www.facebook.com/">
                  <img src="/Pictures/Page.png" alt="facebook-img" />
                </a>
              </div>
              <h2>
                <a>facebook</a>
              </h2>
            </div>
            <div className="widget-item">
              <div className="youtube-img-link">
                <a href="https://www.youtube.com/">
                  <img src="/Pictures/Youtube-1.png" alt="Youtube-img" />
                </a>
              </div>
              <h2>
                <a>youtube</a>
              </h2>
            </div>
            <div className="widget-item">
              <div className="group-img-link">
                <a href="https://www.facebook.com/">
                  <img src="/Pictures/Group-1.png" alt="Group-img" />
                </a>
              </div>
              <h2>
                <a>group</a>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
