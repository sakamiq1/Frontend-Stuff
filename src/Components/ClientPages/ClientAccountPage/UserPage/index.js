import { Layout, Menu, Breadcrumb, Image } from "antd";
import { NavLink } from "react-router-dom";

const { Sider, Content } = Layout;

const UserInformationPage = () => {
  const menuItems = [
    {
      key: "list-tools",
      label: (
        <NavLink to="/user-detail" className="navbar-link">
          User information
        </NavLink>
      ),
    },
    {
      key: "list-keys",
      label: (
        <NavLink to="/user-detail" className="navbar-link">
          Order history
        </NavLink>
      ),
    },
  ];
  return (
    <>
      <Layout style={{ height: "100%" }}>
        <Sider width={200}>
          <Menu
            items={menuItems}
            style={{ minHeight: "100vh", height: "100%" }}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>user Infomation</Breadcrumb.Item>
          </Breadcrumb>
          <Content style={{ background: "#fff" }}>
            <p>User information go hear</p>
            <Image src="/Pictures/sample4.jpg" width={300} height={200} />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default UserInformationPage;
