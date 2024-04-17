/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Button from "../../../Component/Button/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import React, { useContext, useState } from "react";
import logo from "../../../assets/images/logo.png";
import logoWhite from "../../../assets/images/logo-white.png";
import { CgMenuLeftAlt } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import "./header.css";
import { AuthContext } from "../../../Providers/AuthProvider/AuthProvider";

const Header = () => {
  const navigate = useNavigate();
  const { user, logOut }: any = useContext(AuthContext);
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const location = useLocation();
  const contents = [
    { name: "HOME", link: "/" },
    { name: "ALL PROPERTIES", link: "/allProperties" },
    { name: "ABOUT", link: "/about" },
    { name: "SERVICES", link: "/services" },
    { name: "CONTACT", link: "/contact" },
  ];

  const [color, setColor] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 90) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener("scroll", changeColor);

  window.addEventListener("scroll", changeColor);

  const [open, setOpen] = useState(false);
  // const handleOpenNavMenu = (event) => {
  //     setAnchorElNav(event.currentTarget);
  // };
  const handleOpenUserMenu = (event: { currentTarget: any }) => {
    setAnchorElUser(event.currentTarget);
  };

  // const handleCloseNavMenu = () => {
  //     setAnchorElNav(null);
  // };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((err: any) => console.log(err));
  };
  const isHome = location.pathname === "/" || location.pathname === "/about";
  const forName =
    location.pathname === "/contact" ||
    location.pathname === "/allProperties" ||
    location.pathname.includes("/property/") ||
    location.pathname === "/addProperty" ||
    location.pathname.includes("/blogDetail") ||
    location.pathname.includes("/details/");
  return (
    <div className={"w-full fixed z-30 h-20 top-0 left-0 right-0"}>
      <div className={color ? "bg-white shadow-xl" : "bg-transparent"}>
        <div
          className={
            color
              ? "md:flex items-center justify-between py-3 md:px-10  max-w-7xl mx-auto"
              : "md:flex items-center justify-between py-3 md:px-10 max-w-7xl mx-auto"
          }
        >
          <div className="font-bold text-2xl uppercase cursor-pointer text-rose-900 flex">
            <span className="mr-2"></span>
            <Link to="/">
              {isHome ? (
                color ? (
                  <img className="w-44" src={logo} alt="" />
                ) : (
                  <img className="w-44" src={logoWhite} alt="" />
                )
              ) : (
                <img className="w-44" src={logo} alt="" />
              )}
            </Link>
          </div>
          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
          >
            {color ? (
              isHome ? (
                <CgMenuLeftAlt className="text-black" />
              ) : (
                <CgMenuLeftAlt className="text-black" />
              )
            ) : isHome ? (
              <CgMenuLeftAlt className="text-white sm:text-black" />
            ) : (
              <CgMenuLeftAlt className="text-black" />
            )}
          </div>
          <ul
            className={`absolute md:flex text-black md:items-center w-full md:w-auto md:pb-0 pb-12 md:static bg-transparent md:z-auto md:pl-0 px-8 transition-all duration-500 ease-in ${
              open
                ? "right-[0px] top-0 bg-white md:bg-transparent z-50"
                : "-right-[800px] top-0"
            } pt-8 md:pt-0`}
          >
            {contents.map((content) => (
              <li
                onClick={() => setOpen(!open)}
                key={content.link}
                className={`md:ml-8 text-xl md:my-0 my-5 ${
                  color ? "text-black" : isHome ? "md:text-white" : "text-black"
                }`}
              >
                <NavLink
                  className="hover:text-slate-500 duration-400"
                  to={content.link}
                >
                  {content.name}
                </NavLink>
              </li>
            ))}
            {user ? (
              <Box sx={{ flexGrow: 0, marginLeft: "30px" }}>
                <div className="flex justify-center items-center">
                  <h2
                    className={`${
                      color
                        ? "text-black"
                        : forName
                        ? "text-black"
                        : "text-white"
                    } inline mr-4 font-semibold`}
                  >
                    {user?.displayName}
                  </h2>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      {/* <Avatar alt="Remy Sharp" src={user?.photoURL} /> */}
                      <img
                        className="w-10 h-10 rounded-full z-20"
                        src={user?.photoURL}
                        alt=""
                      />
                    </IconButton>
                  </Tooltip>
                </div>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {/* {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))} */}

                  <Link to="/dashboard">
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Dashboard</Typography>
                    </MenuItem>
                  </Link>
                  {/* <Link to="/addProperty">
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Add Property</Typography>
                    </MenuItem>
                  </Link> */}
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography onClick={handleLogout} textAlign="center">
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            )}
            <div onClick={() => setOpen(!open)} className="">
              <RxCross2 className="absolute top-5 right-5 md:hidden text-3xl" />
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
