import { Button, Card, List } from "antd";
import { useEffect } from "react";
import "./index.css";
import listToolServices from "../../../Services/listToolServices";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getListTool } from "../../../Redux/Actions/productActions";

const { Meta } = Card;

const ProductPage = () => {
  const listTool = useSelector((state) => state.allTools.tools);
  const dispatch = useDispatch();

  const loadListTool = () => {
   listToolServices.list().then((res) => {
      dispatch(getListTool(res.results));
    });
  };

  useEffect(() => {
    loadListTool();
  }, []);

  return (
    <div id="product-page-div">
      <div id="banner-div">
        <img src="/Pictures/sample5.png" id="left-sample-img" />
        <img src="/Pictures/sample6.png" id="right-sample-img" />
        <h1 id="greeting-tag">Chào mừng quý khách</h1>
        <p>
          Lưu ý: Chúng tôi không chịu bất cứ trách nhiệm nào liên quan đến việc
          sử dụng tool nhằm đến các mục đích vi phạm pháp luật của các bạn! Trân
          trọng!
        </p>
      </div>

      <div id="tool-list-div">
        <List
          grid={{ column: 3 }}
          pagination={{
            pageSize: 6,
          }}
          dataSource={listTool}
          renderItem={(item) => (
            <List.Item>
              <div className="card-div">
                <Link to={`/tool/${item.id}`}>
                  <Card
                    key={item.id}
                    style={{
                      width: 300,
                      borderRadius: "15px",
                      backgroundColor: "#f7faff",
                    }}
                    cover={
                      <img
                        alt="example"
                        src="/Pictures/sample1.png"
                        style={{ borderRadius: "15px" }}
                      />
                    }
                  >
                    <div className="card-content-div">
                      <h5 className="title">{item.name}</h5>
                      <p>{item.price}</p>
                      <Button className="detail-button">Detail</Button>
                      <Button className="buy-button">Buy</Button>
                    </div>
                  </Card>
                </Link>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
export default ProductPage;
