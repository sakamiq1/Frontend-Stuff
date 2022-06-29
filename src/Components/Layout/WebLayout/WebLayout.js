import { Breadcrumb, Layout, Select } from "antd";
import ProductPage from "../../ClientPages/ProductPage/ProductPage";
import Product from "../../ClientPages/ProductDetail/ProductDetail";
import Navbar from "../Navbar/Navbar";
import { Routes, Route, NavLink } from "react-router-dom";
import AdminManagePage from "../../AdminPages/AdminManagementPage";
import HomePage from "../../ClientPages/HomePage/HomePage";
import UserInformationPage from "../../ClientPages/ClientAccountPage/UserPage";
import ErrorPage from "../../ClientPages/ErrorPage";
import { FacebookFilled, TwitterOutlined } from "@ant-design/icons";
import "./WebLayout.scss";
import i18n from "../../../translation/i18n";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const { Header, Footer, Content } = Layout;
const { Option } = Select;

const DefaultLayout = () => {
  const { t } = useTranslation();
  let prevPos = window.pageYOffset;
  window.onscroll = () => {
    let currentPos = window.pageYOffset;
    if (prevPos > currentPos) {
      document.getElementById("headerId").style.top = "0";
    } else {
      document.getElementById("headerId").style.top = "-5em";
    }
    prevPos = currentPos;
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh", textAlign: "center" }}>
        <Header id="headerId">
          <div id="logo-nav">
            <NavLink exact to="/">
              <img src="/Pictures/sample4.png" alt="logo-img" />
            </NavLink>
          </div>
          <Navbar />
          <Select
            defaultValue="vi"
            onChange={(value) => i18n.changeLanguage(value)}
          >
            <Option value="en">En</Option>
            <Option value="vi">Vi</Option>
          </Select>
        </Header>
        <Layout style={{ marginTop: "5em" }}>
          <Content>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tool" element={<ProductPage />} />
              <Route path="/tool/:toolId" element={<Product />} />
              <Route
                path="/admin/*"
                element={
                  localStorage.getItem("Role") === "admin" ? (
                    <AdminManagePage />
                  ) : (
                    <ErrorPage />
                  )
                }
              />
              <Route
                path="/user/*"
                element={
                  localStorage.getItem("User") ? (
                    <UserInformationPage />
                  ) : (
                    <ErrorPage />
                  )
                }
              />
              <Route path="/404" element={<ErrorPage />} />
            </Routes>
          </Content>
        </Layout>
        <Footer style={{ backgroundColor: "#212121" }}>
          <div className="footer-wrap">
            <div className="footer-top">
              <div>
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <NavLink to="/">{t("home")}</NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <NavLink to="/tool">{t('product')}</NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <NavLink to="/user">User</NavLink>
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <h3>{t('contact')}: 035xxxxxxxxxx</h3>
            </div>
            <div className="footer-bot">
              <h3>Copyright © 2022</h3>
              <div className="footer-widget">
                <FacebookFilled style={{ fontSize: "20px" }} />
                <TwitterOutlined style={{ fontSize: "20px" }} />
              </div>
            </div>
          </div>
        </Footer>
      </Layout>
    </>
  );
};

export default DefaultLayout;
