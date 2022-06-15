import { Layout, Menu, Breadcrumb, Image } from "antd";
import jwtDecode from "jwt-decode";
import { NavLink } from "react-router-dom";

const { Sider, Content } = Layout;

const UserInformationPage = () => {
  const menuItems = [
    {
      key: "list-tools",
      label: (
        <NavLink to="/user" className="navbar-link">
          User information
        </NavLink>
      ),
    },
    {
      key: "list-keys",
      label: (
        <NavLink to="/history" className="navbar-link">
          Order history
        </NavLink>
      ),
    },
  ];

  const user = jwtDecode(localStorage.getItem("Token"));
  console.log(user);

  return (
    <>
      <Layout>
        <Sider width={200}>
          <Menu items={menuItems} mode="inline" theme="dark" />
        </Sider>
        <Layout>
          <Breadcrumb>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>user infomation</Breadcrumb.Item>
          </Breadcrumb>
          <Content>
            <div className="user-informatio-container">im here</div>
            <Image src="/Pictures/sample4.jpg" width={200} height={200} />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default UserInformationPage;
