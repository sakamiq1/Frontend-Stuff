import { Layout } from "antd";
import HomePage from "../../ClientPages/HomePage/index";
import Product from "../../ClientPages/Product/index";
import "./index.css";
import Navbar from "../Navbar/index";
import { Routes, Route, NavLink } from "react-router-dom";
import AdminManagePage from "../../AdminPages/AdminManagementPage";

const { Header, Footer, Content } = Layout;

const DefaultLayout = () => {
  return (
    <>
      <Layout style={{ minHeight: "100%", textAlign: "center" }}>
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
          <NavLink to="/">
            <img src="/Pictures/sample4.png" />
          </NavLink>
          <Navbar />
        </Header>
        <Layout>
          <Content>
            <Routes>
              <Route path="/" exact element={<HomePage />} />
              <Route path="/tool">
                <Route path=":toolId" exact element={<Product />} />
              </Route>
              <Route path="/admin-management" exact element={<AdminManagePage />} />
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
