import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb, Button, Checkbox, Radio, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDetailAsync,
  getDetail,
  removeSelectedTools,
} from "../../../features/details/detailSlice";
import "./ProductDetail.scss";
import ErrorPage from "../ErrorPage";
import {
  FacebookOutlined,
  GoogleOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

const Product = () => {
  const toolDetail = useSelector(getDetail);
  const [detail, setDetail] = useState({});
  const dispatch = useDispatch();
  let param = useParams();

  useEffect(() => {
    if (param.toolId && param.toolId !== "") {
      dispatch(fetchDetailAsync(param.toolId));
    }
    return () => {
      dispatch(removeSelectedTools());
    };
  }, [dispatch]);

  useEffect(() => {
    setDetail(toolDetail);
  }, [toolDetail]);

  return (
    <div className="product-detail-div">
      {detail.data ? (
        <>
          <div className="product-img">
            <img src={detail.data.image} alt={detail.data.name} />
          </div>
          <div className="product-detail">
            <Breadcrumb>
              <Breadcrumb.Item>
                <span className="breadcrumb-detail">Tools</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span className="breadcrumb-detail">{detail.data.name}</span>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div className="product-detail-wrapper">
              <div className="detail-title">
                <h1 id="detail-title">{detail.data.name}</h1>
                <div className="detail-price">
                  <h3>
                    {detail.data.price
                      .toFixed(2)
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                      .replace(".00", "")}{" "}
                    VND
                  </h3>
                  <span id="separator">|</span>
                  <h3 id="detail-status">
                    {detail.data.status === 2
                      ? "Actived"
                      : detail.data.status === 1
                      ? "Disabled"
                      : "Deleted"}
                  </h3>
                </div>
              </div>
              <div className="detail-description">
                <p id="description">{detail.data.description}</p>
              </div>
              <div className="detail-function-wrapper">
                <Radio.Group optionType="button">
                  <Space size="small">
                    <Radio value={1}>1 Month</Radio>
                    <Radio value={2}>2 Months</Radio>
                    <Radio value={3}>3 Months</Radio>
                  </Space>
                </Radio.Group>
                <Checkbox id="shipping-check">
                  Check if you need shipping
                </Checkbox>
                <Button id="buy-button">Buy now</Button>
              </div>
              <div className="detail-share-product">
                <a href="#">
                  <FacebookOutlined />
                </a>
                <a href="#">
                  <GoogleOutlined />
                </a>
                <a href="#">
                  <TwitterOutlined />
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        <ErrorPage />
      )}
    </div>
  );
};

export default Product;
