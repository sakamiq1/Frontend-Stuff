import { Layout, Menu } from "antd";
import ToolManagementPage from "../ToolManagementPage";
import KeyManagementPage from "../KeyManagementPage";
import UserManagementPage from "../UserManagementPage";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";

const { Sider } = Layout;

const AdminManagePage = () => {
  const menuItems = [
    {
      key: "list-tools",
      label: (
        <NavLink to="tool-management" className="navbar-link">
          List Tools
        </NavLink>
      ),
    },
    {
      key: "list-keys",
      label: (
        <NavLink to="key-management" className="navbar-link">
          List Keys
        </NavLink>
      ),
    },
    {
      key: "list-users",
      label: (
        <NavLink to="user-management" className="navbar-link">
          List Users
        </NavLink>
      ),
    },
  ];
  return (
    <>
      <Layout>
        <Sider width={200}>
          <Menu
            items={menuItems}
            mode="inline"
            theme="dark"
            inlineCollapsed={false}
          />
        </Sider>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/tool-management" />} />
          <Route path="tool-management" element={<ToolManagementPage />} />
          <Route path="key-management" element={<KeyManagementPage />} />
          <Route path="user-management" element={<UserManagementPage />} />
        </Routes>
      </Layout>
    </>
  );
};

export default AdminManagePage;
