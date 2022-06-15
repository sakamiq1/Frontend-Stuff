import React from "react";
import { Card, Button } from "antd";
import { Link } from "react-router-dom";
import { ShoppingFilled } from "@ant-design/icons";
import "./ProductCard.scss";

const CardType1 = ({ item }) => (
  <div className="card-div">
    <Card
      className="product-card-container"
      key={item.id}
      cover={
        <img
          alt={item.name}
          src={item.image ? item.image : "/Pictures/sample1.png"}
          style={{ borderRadius: "10px" }}
        />
      }
    >
      <div className="card-content-div">
        <h5 className="title">{item.name}</h5>
        <p>{item.description}</p>
      </div>
      <div className="card-footer-div">
        <p>
          Giá:{" "}
          {item.price &&
            item.price
              .toFixed(2)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
              .replace(".00", "")}{" "}
          VND
        </p>
        <Link to={`/tool/${item.id}`}>
          <Button className="buy-button">
            Buy now <ShoppingFilled />
          </Button>
        </Link>
      </div>
    </Card>
  </div>
);

const CardType2 = ({ item }) => (
  <div className="card-div">
    <Link to={`/tool/${item.id}`}>
      <Card
        className="product-card-container"
        key={item.id}
        cover={
          <img
            alt={item.name}
            src={item.image ? item.image : "/Pictures/sample1.png"}
            style={{ borderRadius: "10px" }}
          />
        }
      >
        <div className="card-content-div">
          <h5 className="title">{item.name}</h5>
        </div>
      </Card>
    </Link>
  </div>
);

const ProductCard = ({ item, flag }) => {
  return flag === "short" ? (
    <CardType2 item={item} />
  ) : (
    <CardType1 item={item} />
  );
};

export default ProductCard;
