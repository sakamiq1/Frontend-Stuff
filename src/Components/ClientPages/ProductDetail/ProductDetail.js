import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Modal,
  Radio,
  Space,
  Typography,
} from "antd";
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
import { useTranslation } from "react-i18next";

const { Text } = Typography;

const Product = () => {
  const { t } = useTranslation();

  const toolDetail = useSelector(getDetail);
  const [detail, setDetail] = useState({});
  const [period, setPeriod] = useState(1);
  const [visible, setVisible] = useState(false);
  const [orderStatus, setOrderStatus] = useState("idle");
  const dispatch = useDispatch();
  let param = useParams();

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    if (orderStatus === "success") {
      setOrderStatus("idle");
      setVisible(false);
    } else {
      setOrderStatus("success");
    }
  };

  const handleBuy = () => {
    setVisible(true);
    console.log(detail);
    console.log(period);
  };

  useEffect(() => {
    if (param.toolId && param.toolId !== "") {
      dispatch(fetchDetailAsync(param.toolId));
    }
    return () => {
      dispatch(removeSelectedTools());
    };
  }, [dispatch, param.toolId]);

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
                      ? t('actived')
                      : detail.data.status === 1
                      ? t('disabled')
                      : t('deleted')}
                  </h3>
                </div>
              </div>
              <div className="detail-description">
                <p id="description">{detail.data.description}</p>
              </div>
              <div className="detail-function-wrapper">
                <Radio.Group
                  optionType="button"
                  onChange={(e) => setPeriod(e.target.value)}
                  value={period}
                >
                  <Space size="small">
                    <Radio value={1}>{t('1month')}</Radio>
                    <Radio value={2}>{t('2month')} </Radio>
                    <Radio value={3}>{t('3month')}</Radio>
                  </Space>
                </Radio.Group>
                <Checkbox id="shipping-check">
                  {t('shipping-check')}
                </Checkbox>
                <Button id="buy-button" onClick={handleBuy}>
                  {t('buynow')}
                </Button>
              </div>
              <div className="detail-share-product">
                <a href="https://www.facebook.com/">
                  <FacebookOutlined />
                </a>
                <a href="https://www.google.com/">
                  <GoogleOutlined />
                </a>
                <a href="https://twitter.com/home?lang=vi">
                  <TwitterOutlined />
                </a>
              </div>
            </div>
          </div>
          <Modal visible={visible} onOk={handleOk} onCancel={handleCancel}>
            {orderStatus === "idle" ? (
              <>
                <Text type="success">{t('your-order')}</Text>
                <p>{detail.data.name}</p>
                <p>{detail.data.code}</p>
                <p>{detail.data.description}</p>
                <p>{detail.data.price}</p>
              </>
            ) : (
              t('submited-order')
            )}
          </Modal>
        </>
      ) : (
        <ErrorPage />
      )}
    </div>
  );
};

export default Product;
