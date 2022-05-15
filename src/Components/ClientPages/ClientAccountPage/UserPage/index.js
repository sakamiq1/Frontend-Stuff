import { Layout, Menu, Breadcrumb, Image, Button } from "antd";
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
            mode="inline"
            theme="dark"
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>user infomation</Breadcrumb.Item>
          </Breadcrumb>
          <Content style={{ background: "#fff", paddingBottom: "150px" }}>
            <p>User information go hear</p>
            <Image src="/Pictures/sample4.jpg" width={300} height={200} />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default UserInformationPage;
