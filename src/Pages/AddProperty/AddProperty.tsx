/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from "sweetalert2";
import { useForm, SubmitHandler } from "react-hook-form";
// import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Component/SectionTitle/SectionTitle.js";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider.js";
import useAxiosPublic from "../../hook/useAxiosPublic.js";
import useDistrict from "../../hook/useDistrict.js";
import useUpazila from "../../hook/useUpazila.js";
// import useAxiosSecure from "../../hook/useAxiosSecure.js";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

type Inputs = {
  name: string;
  upazila: string;
  district: string;
  rent_price: number;
  image: string;
  propertyRent: number;
  // availableQuantity: number;
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

const AddProperty = () => {
  const axiosPublic = useAxiosPublic();
  const [propertyDistrict] = useDistrict();
  const [propertyUpazila] = useUpazila();
  const [selectUpazila, setSelectUpazila] = useState(propertyUpazila);
  const { user }: any = useContext(AuthContext);

  //   const axiosSecure = useAxiosSecure();
  // const agent_name = user?.displayName;
  // const agent_email = user?.email;
  const agent_image = user?.photoURL;

  const { register, handleSubmit } = useForm<Inputs>();
  const handleAddProperty: SubmitHandler<Inputs> = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const name = data.name;
    const upazila = data.upazila;
    const district = data.district;
    const rent_price = data.rent_price;
    const available_quantity = data.available_quantity;
    const bedroom = data.bedroom;
    const bathroom = data.bathroom;
    const available_date = data.available_date;
    const Closing_date = data.Closing_date;
    const agent_email = data.agent_email;
    const agent_name = data.agent_name;
    const area = data.area;
    const description = data.description;
    const image = res.data.data.display_url;

    if (res.data.success) {
      // creat user entry in the database:
      const addPropertyInfo = {
        agent_email,
        agent_name,
        agent_image,
        name,
        upazila,
        district,
        rent_price,
        available_quantity,
        bedroom,
        bathroom,
        available_date,
        Closing_date,
        area,
        description,
        image,
        // verification_status: "pending",
        verification_status: "verified",
        role: "seller",
      };
      const res = await axiosPublic.post("/properties", addPropertyInfo);
      // .then((res) => {
        if (res.data.insertedId) {
          // reset();
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Property added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      // });
    }
    // console.log(data);
  };
  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDistrictName = event.target.value;
    const selectedDistrict = propertyDistrict.find(
      (district: { _id: string; name: string }) =>
        district.name === selectedDistrictName
    );
    const selectedUpazila = propertyUpazila.filter(
      (upaZila: { district_id: number }) =>
        upaZila.district_id == selectedDistrict.id
    );
    setSelectUpazila(selectedUpazila);
    // You can perform actions based on the selected district here
  };
  return (
    <div className="py-8 md:px-20 mt-0">
      <Helmet>
        <title>House Swift | Add Property</title>
      </Helmet>
      <div className="mb-6">
        <SectionTitle
          first="Add"
          second="Property"
        ></SectionTitle>
      </div>

      <form
        onSubmit={handleSubmit(handleAddProperty)}
        className="mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register("name")}
              type="text"
              name="name"
              id="title"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#09BE51] focus:outline-none focus:ring-0 focus:border-[#09BE51] peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="Property Title"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#09BE51] peer-focus:dark:text-[#09BE51] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Property Name
            </label>
          </div>
          <div className="grid md:grid-cols-1 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                {...register("area")}
                type="number"
                name="area"
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#09BE51] focus:outline-none focus:ring-0 focus:border-[#09BE51] peer"
                placeholder=" "
                defaultValue=" "
              />
              <label
                htmlFor="agent_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#09BE51] peer-focus:dark:text-[#09BE51] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Area ( Squre Feet )
              </label>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative z-0 w-full mb-5 group">
            {/* <label className="label">
              <span className="label-text">District*</span>
            </label> */}
            <select
              defaultValue="default"
              {...register("district", { required: true })}
              name="district"
              id="district"
              onChange={(e) => handleDistrictChange(e)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#09BE51] focus:outline-none focus:ring-0 focus:border-[#09BE51] peer"
            >
              <option
                disabled
                value="default"
              >
                select a district
              </option>

              {propertyDistrict.map(
                (district: { _id: string; name: string }) => (
                  <option
                    key={district._id}
                    value={district.name}
                  >
                    {district.name}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            {/* <label className="label">
              <span className="label-text"> Upazila*</span>
            </label> */}
            <select
              defaultValue="default"
              {...register("upazila", { required: true })}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#09BE51] focus:outline-none focus:ring-0 focus:border-[#09BE51] peer"
            >
              <option
                disabled
                value="default"
              >
                select a upazila
              </option>
              {selectUpazila.map((upazila: { _id: string; name: string }) => (
                <option
                  key={upazila._id}
                  value={upazila.name}
                >
                  {upazila.name}
                </option>
              ))}
            </select>
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
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_phone"
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
              placeholder=" "
              required
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
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_phone"
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
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_phone"
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
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#09BE51] focus:outline-none focus:ring-0 focus:border-[#09BE51] peer"
              placeholder=" "
              defaultValue={user?.email}
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
              defaultValue={user?.displayName}
              readOnly
            />
            <label
              htmlFor="agent_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#09BE51] peer-focus:dark:text-[#09BE51] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Agent name
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register("available_date")}
              name="available_date"
              type="date"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#09BE51] focus:outline-none focus:ring-0 focus:border-[#09BE51] peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="agent_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#09BE51] peer-focus:dark:text-[#09BE51] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Available From
            </label>
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="property_Image"
            >
              Property Image
            </label>
            <input
              {...register("image")}
              name="image"
              className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="default_size"
              type="file"
            />
          </div>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <textarea
            {...register("description")}
            name="description"
            id="floating_first_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#09BE51] focus:outline-none focus:ring-0 focus:border-[#09BE51] peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="agent_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#09BE51] peer-focus:dark:text-[#09BE51] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Description
          </label>
        </div>
        <button
          type="submit"
          className="w-full font-semibold border bg-[#09BE51] hover:border hover:border-[#09BE51] hover:bg-transparent duration-300 hover:text-[#09BE51] text-white my-2 p-2 text-center "
        >
          Add Property
        </button>
      </form>
      <p>{}</p>
    </div>
  );
};

export default AddProperty;
