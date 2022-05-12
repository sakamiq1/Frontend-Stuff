import { Layout } from "antd";
import ProductPage from "../../ClientPages/ProductPage/index";
import Product from "../../ClientPages/Product/index";
import "./index.css";
import Navbar from "../Navbar/index";
import { Routes, Route, NavLink } from "react-router-dom";
import AdminManagePage from "../../AdminPages/AdminManagementPage";
import HomePage from "../../ClientPages/HomePage";

const { Header, Footer, Content } = Layout;

const DefaultLayout = () => {
  return (
    <>
      <Layout style={{ minHeight: "100vh", textAlign: "center" }}>
        <Header
          style={{
            position: "sticky",
            top: "0px",
            left: "0px",
            width: "100%",
            zIndex: 1,
            backgroundColor: "white",
          }}
        >
          <NavLink exact to="/home">
            <img src="/Pictures/sample4.png" />
          </NavLink>
          <Navbar />
        </Header>
        <Layout>
          <Content>
            <Routes>
              <Route path="/*" element={<HomePage />} />
              <Route path="/tool" element={<ProductPage />} />
              <Route path="/tool/:toolId" element={<Product />} />
              <Route path="/admin/*" element={<AdminManagePage />} />
            </Routes>
          </Content>
        </Layout>
        <Footer>
          <h3>Copyright © 2022</h3>
        </Footer>
      </Layout>
    </>
  );
};

export default DefaultLayout;
