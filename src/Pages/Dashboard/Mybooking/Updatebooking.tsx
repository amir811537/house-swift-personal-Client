import {  useLoaderData, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
type Inputs = {
    Chack_In_Date: number;
    Chack_out_Date: number;
    name: string;
    upazila: string;
    district: string;
    rent_price: number;
    image: string;
    propertyRent: number;
    description: string;
    agent_email: string;
    agent_name: string;
    available_date: string;
    Closing_date: string;
    available_quantity: number;
    bedroom: number;
    bathroom: number;
    area: number;
  };

const Updatebooking = () => {

    const { user } = useContext(AuthContext);
    // console.log(user?.email)
    const { register, handleSubmit } = useForm<Inputs>();
    const updatebookingdata = useLoaderData();
    console.log(updatebookingdata);
    const navigate= useNavigate();

    const {
        name,
        upazila,
        area,
        district,
        rent_price,
        propertyRent,
        agent_email,
        agent_name,
        available_quantity,
        bedroom,
        bathroom,
        image,
        agent_image,
        Chack_In_Date,
        Chack_out_Date,
        _id
      } = updatebookingdata;



      
      const updateBooking: SubmitHandler<Inputs> = async (data) => {
        const Chack_In_Date = data.Chack_In_Date;
        const Chack_out_Date = data.Chack_out_Date;
        const userEmail = user.email;
        const mybooking = {
          agent_email,
          agent_name,
          name,
          upazila,
          district,
          rent_price,
          available_quantity,
          bedroom,
          bathroom,
          Chack_In_Date,
          Chack_out_Date,
          area,
          image,
          agent_image,
          userEmail
        };
        console.log(mybooking);
    
        try {
          // Replace the axiosPublic.post with axios.post
          const res = await axios.patch(
            `http://localhost:4000/mybooking/${_id}`,
            mybooking
          );
    
          if (res.data.modifiedCount) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500
            }); 
            navigate( "/dashboard/Mybookings");    }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });    }
      };


    return (
        <div className="py-40 md:px-20 mt-0">
      <Helmet>
        <title>House Swift | Add Property</title>
      </Helmet>
      <div className="mb-6">
        <SectionTitle first="Update" second="booking"></SectionTitle>
      </div>

      <form onSubmit={handleSubmit(updateBooking)} className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register("name")}
              type="text"
              name="name"
              id="title"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#09BE51] focus:outline-none focus:ring-0 focus:border-[#09BE51] peer"
              placeholder=" "
              value={name}
              readOnly
            />
            <label
              htmlFor="Property Title"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#09BE51] peer-focus:dark:text-[#09BE51] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Property Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register("area")}
              type="number"
              name="area"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#09BE51] focus:outline-none focus:ring-0 focus:border-[#09BE51] peer"
              value={area}
              readOnly
            />
            <label
              htmlFor="agent_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#09BE51] peer-focus:dark:text-[#09BE51] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Area ( Square Feet )
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register("upazila")}
              type="text"
              name="upazila"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#09BE51] focus:outline-none focus:ring-0 focus:border-[#09BE51] peer"
              value={upazila}
              readOnly
            />
            <label
              htmlFor="upazila"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#09BE51] peer-focus:dark:text-[#09BE51] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Upazila
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register("district")}
              type="text"
              name="district"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#09BE51] focus:outline-none focus:ring-0 focus:border-[#09BE51] peer"
              value={district}
              readOnly
            />
            <label
              htmlFor="district"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#09BE51] peer-focus:dark:text-[#09BE51] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              district
            </label>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register("rent_price")}
              type="number"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              name="rent_price"
              id="rent_price"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#09BE51] focus:outline-none focus:ring-0 focus:border-[#09BE51] peer"
              value={rent_price}
              readOnly
            />
            <label
              htmlFor="rent_price"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#09BE51] peer-focus:dark:text-[#09BE51] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Rent - Price
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register("available_quantity")}
              type="number"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              name="available_quantity"
              id="available_quantity"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#09BE51] focus:outline-none focus:ring-0 focus:border-[#09BE51] peer"
              readOnly
              value={available_quantity}
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#09BE51] peer-focus:dark:text-[#09BE51] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Quantity
            </label>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register("bedroom")}
              type="number"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              name="bedroom"
              id="bedroom"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#09BE51] focus:outline-none focus:ring-0 focus:border-[#09BE51] peer"
              value={bedroom}
              readOnly
            />
            <label
              htmlFor="bedroom"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#09BE51] peer-focus:dark:text-[#09BE51] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Bedrooms
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register("bathroom")}
              type="number"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              name="bathroom"
              id="bathroom"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#09BE51] focus:outline-none focus:ring-0 focus:border-[#09BE51] peer"
              readOnly
              value={bathroom}
            />
            <label
              htmlFor="bathroom"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#09BE51] peer-focus:dark:text-[#09BE51] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Bathrooms
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register("agent_email")}
              type="email"
              name="agent_email"
              id="agent_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#09BE51] focus:outline-none focus:ring-0 focus:border-[#09BE51] peer"
              placeholder=" "
              value={agent_email}
              readOnly
            />
            <label
              htmlFor="agent_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#09BE51] peer-focus:dark:text-[#09BE51] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Agent Email
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register("agent_name")}
              type="text"
              name="agent_name"
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#09BE51] focus:outline-none focus:ring-0 focus:border-[#09BE51] peer"
              placeholder=" "
              value={agent_name}
              readOnly
            />
            <label
              htmlFor="agent_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#09BE51] peer-focus:dark:text-[#09BE51] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Agent Name
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register("Chack_In_Date")}
              type="date"
              name="Chack_In_Date"
              id="Chack_In_Date"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#09BE51] focus:outline-none focus:ring-0 focus:border-[#09BE51] peer"
              required
              defaultValue={Chack_In_Date}
            />
            <label
              htmlFor="available_date"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#09BE51] peer-focus:dark:text-[#09BE51] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              ChackIn Date
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register("Chack_out_Date")}
              type="date"
              name="Chack_out_Date"
              id="Chack_out_Date"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#09BE51] focus:outline-none focus:ring-0 focus:border-[#09BE51] peer"
              defaultValue={Chack_out_Date}
            />
            <label
              htmlFor="Chack_out_Date"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#09BE51] peer-focus:dark:text-[#09BE51] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              ChackOut Date
            </label>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="uppercase w-full border border-[#09BE51] bg-[#09BE51] hover:bg-transparent text-white py-1 text-lg px-6 md:ml-8 hover:border hover:border-[#09BE51] hover:text-[#09BE51] duration-300 cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    );
};

export default Updatebooking;