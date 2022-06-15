import { Card, List } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchToolsAsync,
  removeCurentTools,
} from "../../../features/tools/toolSlice";
import { getTools } from "../../../features/tools/toolSlice";
import "./ProductPage.scss";
import ProductCard from "../../ProductCard/ProductCard";

const ProductPage = () => {
  const listTool = useSelector(getTools);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchToolsAsync());
    return () => dispatch(removeCurentTools());
  }, [dispatch]);

  return (
    <div id="product-page-div">
      <div className="banner-div">
        <img
          src="/Pictures/sample2.jpg"
          alt="banner-image"
          className="main-sample-img"
        />
        <img src="/Pictures/sample5.png" alt="" className="left-sample-img" />
        <img src="/Pictures/sample6.png" alt="" className="right-sample-img" />
        <div className="greeting-div">
          <img src="/Pictures/616430.png" alt="cat icon tool online" />
          <h1 className="greeting-tag">You need some tools ?</h1>
        </div>
      </div>
      <div className="tool-list-div">
        <h1 className="tool-list-title">our products</h1>
        <hr />
        {listTool && (
          <List
            grid={{ column: 3 }}
            pagination={{
              pageSize: 3,
            }}
            style={{ marginTop: "40px" }}
            dataSource={listTool.results}
            renderItem={(item) => (
              <List.Item>
                <ProductCard item={item} />
              </List.Item>
            )}
          />
        )}
      </div>
    </div>
  );
};
export default ProductPage;
