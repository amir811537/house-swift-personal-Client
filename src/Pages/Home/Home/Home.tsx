import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Blog from "../Blog/Blog";
import Populars from "../Popular/Populars";
import { useEffect } from "react";
import TransitionEffect from "../../../Component/TransitionEffect/TransitionEffect";
import { Search } from "../../Search/Search";
import axios from "axios";
import { messaging } from "../../../firebase/firebase.config";
import { getToken } from "firebase/messaging";
import Swal from "sweetalert2";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function requestPermission() {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        // generate token
        const token = await getToken(messaging, {
          vapidKey:
            "BOlYcT3OsqUVbhhm8QoJiX8eldrUriBqhz2C1pwhluqO8uhCHUoNvWXZnMsrQX8ZQACpUZbeHS-syi-hdn0Td7M",
        });
        // console.log("this is token =====>", token);

        // Make sure to await the axios.post call
        const res = await axios.post(
          "https://task-management-serverside-ten.vercel.app/allUserToken",
          {
            token,
          }
        );

        if (res.data.insertedId) {
          Swal.fire({
            position: "top",
            title: "Notification allow successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        // in this token storage in DB using post method
        //  then you added into firebase cloude messaging tools and send your message
      } else if (permission === "denied") {
        Swal.fire({

          icon: "error",
          title: "Oops...",
          text: "you denied the notification!",

        });
      }
    } catch (error) {
      console.error("Error requesting permission or sending token:", error);
    }
  }

  useEffect(() => {
    // req user for get notification permission
    requestPermission();
  }, []);

  return (
    <div>
      <Helmet>
        <title>House Swift | Home</title>
      </Helmet>
      <TransitionEffect></TransitionEffect>
      <Banner />
      <Search></Search>
      <Populars></Populars>
      <Blog></Blog>
    </div>
  );
};

export default Home;
