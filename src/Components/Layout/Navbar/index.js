import { Menu } from "antd";
import "./index.css";
import { NavLink } from "react-router-dom";

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
];

const Navbar = () => (
  <div id="navbar-div">
    <Menu mode="horizontal" items={items} style={{position: 'absolute', top: 0, right: 0}} />
  </div>
);

export default Navbar;
