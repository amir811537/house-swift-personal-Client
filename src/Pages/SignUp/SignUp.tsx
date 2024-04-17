/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */

import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import animationLottie from "../../assets/animation/lottieFileRegister.json";
import Lottie from "lottie-react";
import { SubmitHandler, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import useAxiosPublic from "../../hook/useAxiosPublic";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

type FormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  image: string;
  phoneNumber: number;
  termsAccepted: boolean;
};

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { createUser, handleUpdateProfile }: any = useContext(AuthContext);

  const [phoneNumber, setPhoneNumber] = useState("");

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // console.log("Form submitted:", data);
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const firstName = data.firstName;
    const lastName = data.lastName;
    const email = data.email;
    const phone = data.phoneNumber;
    const image = res.data.data.display_url;

    if (res.data.success) {
      createUser(data.email, data.password).then(() => {
        // const loggedUser = result.user;
        // console.log(loggedUser);
        handleUpdateProfile(
          data.lastName,
          res.data.data.display_url,
          data.firstName
        )
          .then(() => {
            // creat user entry in the database:
            const usersInfo = {
              firstName,
              lastName,
              email,
              phone,
              image,
              role: "user",
              status: "active",
            };
            // console.log(usersInfo);
            axiosPublic.post("/propertyUsers", usersInfo).then((res) => {
              if (res.data.insertedId) {
                reset();
                Swal.fire({
                  position: "top",
                  icon: "success",
                  title: "user added successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
            navigate("/");
          })
          .catch((error: string) => console.log(error));
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-24">
        {/* left side logo and animation */}
        <div className="w-10/12 flex bg-gray-100 rounded-2xl mx-auto shadow-lg overflow-hidden ">
          <div className="sm:block hidden w-1/2 md:flex items-center justify-center">
            <Lottie animationData={animationLottie} loop={true} />
          </div>
          {/* form header  */}
          <div className=" md:w-1/2 w-full py-16 px-14">
            <h2 className="font-bold text-3xl text-center">Register</h2>
            <p className="text-sm mt-2 mb-5 text-center">
              Create your account. It's free and only takes a minute
            </p>
            {/* form start here*/}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="FirstName"
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                  className="w-full text-[#060606] py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="LastName"
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                  className="w-full text-[#060606] py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
              </div>
              <div className="w-2/3">
                <label className="label">
                  <span className="label-text">Photo*</span>
                </label>
                <input
                  {...register("image", { required: true })}
                  type="file"
                  className="file-input"
                />
              </div>
              <div className="mt-1">
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="Email"
                  className="w-full text-[#060606] py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 16,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  placeholder="Password"
                  className="w-full text-[#060606] py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">Password must be 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">
                    Password must be less than 16 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password have one Uppercase one lower case, one number must
                    and one special character.
                  </p>
                )}
              </div>
              {/* contact field phone */}
              <div className="mt-5">
                <PhoneInput
                  country={"bangladesh"}
                  {...register("phoneNumber")}
                  placeholder="Phone number"
                  value={phoneNumber}
                  onChange={(value) => setPhoneNumber(value)}
                />
              </div>
              {/* photo field  */}
              {/* <div className="mt-5">
                <input
                  type="file"
                  id="photoURL"
                  {...register("photoURL")}
                  className="w-full text-[#060606] py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
              </div> */}
              <div className="mt-5 flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("termsAccepted")}
                  className="text-[#060606] py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
                <span>
                  I accept the &nbsp;
                  <a
                    href="#"
                    className="font-semibold underline underline-offset-2 cursor-pointer"
                  >
                    terms of Use
                  </a>
                  &nbsp;&{" "}
                  <a
                    href="#"
                    className="font-semibold underline underline-offset-2 cursor-pointer"
                  >
                    privacy policy
                  </a>
                </span>
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  className="w-full font-semibold border bg-[#09BE51] hover:border hover:border-[#09BE51] hover:bg-transparent duration-300 hover:text-[#09BE51] text-white my-2 p-2 text-center "
                >
                  Register
                </button>
              </div>
              <div className="mt-5">
                <p className="py-1 px-2 w-full text-center">
                  Already have a account?
                  <Link to="/login">
                    <span className="font-semibold text-blue-500 underline underline-offset-2 cursor-pointer">
                      &nbsp;Please Sign In
                    </span>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
