import { Menu, Avatar, Image } from "antd";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../../features/user/userSlice";
import "./Navbar.scss";

const Navbar = () => {
  const [loginStt, setLoginStt] = useState(
    localStorage.getItem("User") && true
  );
  const userName = localStorage.getItem("User");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [currentNav, setCurrentNav] = useState(location.pathname);

  const logout = () => {
    localStorage.removeItem("Role");
    localStorage.removeItem("Token");
    localStorage.removeItem("User");
    setLoginStt(false);
    dispatch(logOut());
    navigate("/");
  };

  useEffect(() => {
    if (currentNav !== location.pathname) {
      setCurrentNav(location.pathname);
    }
  }, [location, currentNav]);

  function handleClick(e) {
    setCurrentNav(e.key);
  }

  const items = [
    {
      key: "/",
      label: (
        <NavLink exact to="/" className="navbar-link">
          Trang chủ
        </NavLink>
      ),
    },
    {
      key: "/tool",
      label: (
        <NavLink exact to="/tool" className="navbar-link">
          Sản phẩm
        </NavLink>
      ),
    },
    {
      key: "/admin",
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
                preview="false"
              />
            }
          />
          <span style={{ marginLeft: "10px" }}>{userName}</span>
        </>
      ) : (
        <NavLink exact to="/login" className="navbar-link">
          Sign In
        </NavLink>
      ),
      children: loginStt && [
        {
          label: (
            <NavLink exact to="/user" className="navbar-link">
              User info
            </NavLink>
          ),
          key: `${userName}-info`,
        },
        { label: "History", key: `${userName}-history` },
        { label: <a onClick={logout}>LogOut</a>, key: "logOut" },
      ],
    },
  ];

  return (
    <div className="navbar-div">
      <Menu
        mode="horizontal"
        items={items}
        selectedKeys={[currentNav]}
        onClick={handleClick}
        style={{ border: "none" }}
      />
    </div>
  );
};

export default Navbar;
