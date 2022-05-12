import { Menu, Avatar, Image } from "antd";
import "./index.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const userName = localStorage.getItem("User");

  const items = [
    {
      key: "home",
      label: (
        <NavLink exact to="/home" className="navbar-link">
          Trang chủ
        </NavLink>
      ),
    },
    {
      key: "tool",
      label: (
        <NavLink exact to="/tool" className="navbar-link">
          Sản phẩm
        </NavLink>
      ),
    },
    {
      key: "admin-management",
      label: (
        <NavLink exact to="/admin" className="navbar-link">
          Admin
        </NavLink>
      ),
    },
    {
      key: "user-nav",
      label: userName ? (
        <>
          <Avatar
            src={
              <Image
                src="/Pictures/sample4.jpg"
                style={{ width: 32, height: 32 }}
              />
            }
          />
          {userName}
        </>
      ) : (
        <NavLink exact to="/login" className="navbar-link">
          Sign In
        </NavLink>
      ),
      children: userName && [
        {
          label: (
            <NavLink exact to="/user" className="navbar-link">
              User info
            </NavLink>
          ),
          key: `${userName}-info`,
        },
        { label: "History", key: `${userName}-history` },
        { label: "Log Out", key: "logOut" },
      ],
    },
  ];
  return (
    <div id="navbar-div">
      <Menu
        mode="horizontal"
        items={items}
        style={{ position: "absolute", top: 0, right: 0 }}
      />
    </div>
  );
};

export default Navbar;
