/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

import Lottie from "lottie-react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../Providers/AuthProvider";
import loginAnimation from "../../assets/animation/login-animation.json";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hook/useAxiosPublic";
const SignIn = () => {
  const { googleLogin, login, facebookLogin }: any = useContext(AuthContext); // Non-Nullable Assertion
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleGoogleSignIn = async () => {
    try {
      await googleLogin()
        .then((result: { user: any }) => {
          // console.log(result.user);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully LogIn By Google",
            showConfirmButton: false,
            timer: 1500,
          });
          const usersInfo = {
            email: result?.user?.email,
            name: result?.user?.displayName,
            photo: result?.user?.photoURL,
          };
          axiosPublic.post("/propertyUsers", usersInfo);
          navigate(location?.state ? location.state : "/");
        })
        .catch((err: any) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    }
  };
  // const handleGithubLogin = async () => {
  //   try {
  //     await githubLogin().then((result: { user: any; }) => {
  //       console.log(result.user)
  //       navigate("/");
  //     })
  //       .catch((err: any) => {
  //         console.log(err)
  //       })
  //   } catch (error) {
  //     console.error("Error during Google Sign-In:", error);
  //   }
  // };
  const handleFacebookLogin = async () => {
    try {
      await facebookLogin()
        .then((result: { user: any }) => {
          // console.log(result.user);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully LogIn By Facebook",
            showConfirmButton: false,
            timer: 1500,
          });
          const usersInfo = {
            email: result?.user?.email,
            name: result?.user?.displayName,
            photo: result?.user?.photoURL,
          };
          axiosPublic.post("/propertyUsers", usersInfo);
          navigate(location?.state ? location.state : "/");
        })
        .catch((err: any) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    }
  };

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    login(email, password)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully LogIn By Email & Passaword",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location?.state ? location.state : "/");
        setEmail("");
        setPassword("");
      })
      .catch((err: any) => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: err.code,
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(err);
      });
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center py-24">
      <div className="max-w-7xl mx-auto bg-gray-100 flex rounded-2xl shadow-lg p-5 gap-6">
        <div className="md:w-1/2">
          <h2 className="font-bold text-3xl text-center">Login</h2>
          <p className="text-sm mt-2 mb-5 text-center">
            If you already a member, easily log in
          </p>
          {/* form start here */}
          <form>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-[#060606] py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-[#060606] py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />

            {/* forget password and remind me */}
            <div className="flex items-center justify-between my-2 mb-4">
              <div className="flex items-center justify-between ">
                <input
                  type="checkbox"
                  className="w-4 h-4 mr-2 flex items-center justify-center"
                />
                <p className="text-center">Remember Me</p>
              </div>
              <div className="font-medium text-sm underline cursor-pointer whitespace-nowrap">
                <p className="text-blue-600 font-semibold">Forget Password ?</p>
              </div>
            </div>

            {/* login btn  */}
            <button
              onClick={handleLogin}
              className="w-full font-semibold border bg-[#09BE51] hover:border hover:border-[#09BE51] hover:bg-transparent duration-300 hover:text-[#09BE51] text-white my-2 p-2 text-center "
            >
              Login
            </button>
            {/* divider  */}
            <div className="divider">Or</div>
            {/* social login */}
            <div
              onClick={handleGoogleSignIn}
              className="w-full font-semibold text-[#060606] my-2 bg-white border border-black/40  p-2 text-center flex items-center justify-center cursor-pointer"
            >
              <FcGoogle className="h-6 mr-2 text-xl" />
              Sign In With Google
            </div>
            {/*            <div onClick={handleGithubLogin} className="w-full font-semibold text-[#060606] my-2 bg-white border border-black/40  p-2 text-center flex items-center justify-center cursor-pointer">

              <FaGithub className="h-6 mr-2" />
              Sign In With Github
            </div> */}
            <div
              onClick={handleFacebookLogin}
              className="w-full font-semibold text-[#060606] my-2 bg-white border border-black/40  p-2 text-center flex items-center justify-center cursor-pointer"
            >

              <FaFacebook className="h-6 mr-2  text-xl text-blue-700" />
              Sign In With FaceBook
            </div>
            {/* exist account  */}
            <div className="w-full flex items-center justify-center my-4">
              <p className="text-[#060606] text-sm font-normal ">
                Dont have any account ? &nbsp;
                <Link to="/register">
                  <span className="font-semibold text-blue-500 underline cursor-pointer">
                    Sign Up
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* banner/logo  */}
        <div className="hidden w-1/2 md:flex items-center justify-center">
          {/* <img
            className="rounded-2xl"
            src="https://i.ibb.co/5rmF67F/12469785-Wavy-REst-03-Single-01.jpg"
            alt="logo"
          /> */}
          <Lottie
            animationData={loginAnimation}
            loop={true}
          />
        </div>
      </div>
    </section>
  );
};

export default SignIn;
