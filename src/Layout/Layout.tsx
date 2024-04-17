import { Outlet } from "react-router-dom";

import Header from "../Pages/Home/Header/Header";
import Footer from "../Pages/Home/Footer/Footer";



const Layout = () => {
  

  return (
    <>
    <Header></Header>
      <Outlet ></Outlet>
      <Footer></Footer>
    </>
  );
};

export default Layout;
