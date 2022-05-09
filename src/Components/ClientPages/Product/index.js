import listToolServices from "../../../Services/listToolServices";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { getToolDetails } from "../../../Redux/Actions/productActions";

const Product = () => {
  const tool = useSelector((state) => state.details);
  const dispatch = useDispatch();
  let param = useParams();
  
  const getDetails = async () => {
    await listToolServices.getToolById(param.toolId).then((res) => {
      dispatch(getToolDetails(res.data));
    });
  };

  useEffect(() => {
    if (param.toolId && param.toolId !== "") {
      getDetails();
    }
  }, [param.toolId]);
  
  return (
    <div id="product-div">
      <h1 id="product-title">{tool.name}</h1>
      <h3 id="product-description">{tool.description}</h3>
      <div id="product-detail">
        <div id="sample-img-div">
          <img src="/Pictures/sample4.jpg" />
        </div>
        <div>
          <table>
            <tr>
              <th>Phần mềm</th>
              <th>Thời gian</th>
              <th>Giá</th>
            </tr>
            <tr>
              <td>{tool.name}</td>
              <td>1 tháng</td>
              <td>{tool.price}</td>
            </tr>
          </table>

          <p>
            Chấp nhận thanh toán qua chuyển khoản ngân hàng, momo, paypal Tool
          </p>
          <p>
            không đăng kí cứng ở 1 máy. Bạn có thể sử dụng tool ở bất kì đâu
          </p>
          <Button id="buy-button" primary>
            Mua ngay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
