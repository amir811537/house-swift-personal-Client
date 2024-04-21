import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../Component/Button/Button";
import Modal from "./Modal";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import useAllReviews from "../../hook/useAllReviews";
import Swal from "sweetalert2";
import useAuth from "../../hook/useAuth";
import useAxiosPublic from "../../hook/useAxiosPublic";

type PropertyDetailsType = {
  name: string;
  upazila: string;
  district: string;
  image: string;
  rent_price: number;
  bedroom: number;
  bathroom: number;
  area: number;
  available_date: string;
  agent_name: string;
  agent_image: string;
  description: string;
  rating: number;
  available_quantity: string;
  _id: string;
  agent_email: string;
};
// declear the type of from data
type FormData = {
  description: string;
  rating: number;
  _id: string;
};

const PropertyDetails: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const propertyDetails = useLoaderData() as PropertyDetailsType;
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const {
    name,
    upazila,
    district,
    image,
    rent_price,
    available_quantity,
    bedroom,
    bathroom,
    area,
    agent_name,
    agent_image,
    description,
    agent_email,
    _id,
  } = propertyDetails || {};

  const [open, setOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // use tanstack query for get the the all review data
  const [allReviews, reReviewFetch] = useAllReviews();
  // console.log("============>",allReviews)

  // submit the modal form data and post he data mongoDb
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      console.log(user?.displayURL);
      const allReviewData = {
        review: data.description,
        rating: data.rating,
        reviewID: _id,
        reviewDate: new Date().toLocaleDateString(),
        reviewTime: new Date().toLocaleTimeString(),
        userEmail: user?.email,
        agent_email: agent_email,
        userImage: user?.photoURL,
      };

      const res = await axios.post(
        "https://house-swift-web-creations-server-six.vercel.app/allRewiews",
        {
          allReviewData,
        }
      );

      if (res.data.insertedId) {
        reReviewFetch();
        setOpen(false);
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Your review added successfully",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "you alreay added your review!",
        });
      }
    } catch (error) {
      console.error("Error requesting added review:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "you alreay added your review!",
      });
    }
  };

  // const [filteredReviews, setFilteredReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);

  // after getting the review dat declear the type of reveiew data
  interface Review {
    _id: string;
    reviewData: {
      _id: string;
      review: string;
      rating: string;
      reviewID: string;
      reviewDate: string;
      reviewTime: string;
      userEmail?: string;
      agent_email?: string;
      userImage: string;
    };
  }
  // filter the data using the _id=== reviewID

  useEffect(() => {
    const filteredData = allReviews.filter(
      (review: { reviewData: { reviewID: string } }) =>
        review?.reviewData?.reviewID === _id
    );
    setFilteredReviews(filteredData);
  }, [allReviews, _id]);

  // console.log("=======> filter data ", filteredReviews);
  const handleAddToWishlist = async () => {
    const wishlistProperty = {
      name,
      upazila,
      district,
      image,
      rent_price,
      available_quantity,
      bedroom,
      bathroom,
      area,
      agent_name,
      agent_image,
      description,
      agent_email,
      wishlistId: _id,
      userEmail: user?.email,
    };
    const res = await axiosPublic.post("/wishlists", wishlistProperty);
    console.log(res.data);
    if (res.data.insertedId) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Added to Wishlist",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 1 }}
        className="card card-compact shadow-xl"
      >
        <div className="max-w-7xl mx-auto mt-20 my-8 md:px-20 py-8">
          <Helmet>
            <title>House Swift | Property Details</title>
          </Helmet>
          <div className="flex gap-10">
            <div className="w-4/6">
              <div
                style={{ height: "560px" }}
                className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <div>
                  <img
                    className="p-5 rounded-t-lg w-full h-[400px]"
                    src={image}
                    alt="product image"
                  />
                </div>
                <div className="px-5 pb-5">
                  <div className="flex justify-between items-start mr-3">
                    <div>
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {name}
                      </h5>
                      <h3 className="text-sm text-gray-600">
                        {upazila}, {district}
                      </h3>
                    </div>
                    <h3 className="font-semibold text-gray-500">
                      Bedroom - {bedroom}
                    </h3>
                    <h3 className="font-semibold text-gray-500">
                      Bathroom - {bathroom}
                    </h3>
                    <h3 className="font-semibold text-gray-500">
                      Area - {area} sq/ft
                    </h3>
                  </div>
                  <div className="flex items-center mt-2.5 mb-5">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-gray-200 dark:text-gray-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    </div>
                    <span className="bg-blue-100 text-[#EB6753] text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-[#EB6753] ms-3">
                      5.0
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      ${rent_price}
                    </span>
                    <div className="flex gap-2">
                    <span onClick={handleAddToWishlist}>
                      <Button>Wishlist</Button>
                    </span>
                    <span>
                     <Link to={`/booking/${_id}`}><Button>Book</Button></Link>
                    </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="shadow rounded-lg w-full mt-8 p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">
                    Reviews({filteredReviews.length} +)
                  </h3>
                  <button
                    className="uppercase w-fit border border-[#09BE51] bg-[#09BE51] hover:bg-transparent text-white py-1 text-lg px-6 md:ml-8 hover:border hover:border-[#09BE51] hover:text-[#09BE51] duration-300 cursor-pointer"
                    onClick={() => setOpen(true)}
                  >
                    Review
                  </button>
                  {/* <!-- Modal toggle --> */}
                  <Modal open={open} onClose={() => setOpen(false)}>
                    <form
                      className="p-4 md:p-5"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="grid gap-4 mb-4">
                        <div className="h-auto w-96">
                          <label
                            htmlFor="description"
                            className="block mb-2 text-sm text-center font-medium text-gray-900 dark:text-white"
                          >
                            Write your review here
                          </label>
                          <div className="text-center">
                            <div className="rating">
                              <input
                                type="radio"
                                value="1"
                                className="mask mask-star-2 bg-orange-400"
                                {...register("rating", {
                                  required: "Rating is required",
                                })}
                              />
                              <input
                                type="radio"
                                value="2"
                                className="mask mask-star-2 bg-orange-400"
                                {...register("rating", {
                                  required: "Rating is required",
                                })}
                              />
                              <input
                                type="radio"
                                value="3"
                                className="mask mask-star-2 bg-orange-400"
                                {...register("rating", {
                                  required: "Rating is required",
                                })}
                              />
                              <input
                                type="radio"
                                value="4"
                                className="mask mask-star-2 bg-orange-400"
                                {...register("rating", {
                                  required: "Rating is required",
                                })}
                              />
                              <input
                                type="radio"
                                value="5"
                                className="mask mask-star-2 bg-orange-400"
                                {...register("rating", {
                                  required: "Rating is required",
                                })}
                              />
                            </div>
                          </div>
                          <textarea
                            id="description"
                            rows={4}
                            {...register("description", {
                              required: "Description is required",
                            })}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write your review here"
                          ></textarea>
                          {errors.rating && (
                            <span className="text-red-500">
                              {errors.rating.message}
                            </span>
                          )}
                          {errors.description && (
                            <span className="text-red-500">
                              {errors.description.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <button
                          type="submit"
                          className="uppercase border border-[#09BE51] bg-[#09BE51] hover:bg-transparent text-white py-1 text-lg px-6 hover:border hover:border-[#09BE51] hover:text-[#09BE51] duration-300 cursor-pointer"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </Modal>
                </div>
                <div>
                  {/* maping the filter review data  */}
                  <div>
                    {filteredReviews.map((review) => (
                      <>
                        <div
                          key={review?.reviewData?._id}
                          className="py-8 border-b-2 border-gray-400"
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <img
                                className="w-12 h-12 rounded-full"
                                src={review?.reviewData?.userImage}
                                alt=""
                              />
                              <div>
                                <h2 className="font-semibold">
                                  {review?.reviewData.userEmail}
                                </h2>
                                <h3 className="text-sm text-gray-500">
                                  {review?.reviewData.reviewDate}
                                </h3>
                              </div>
                            </div>
                            <div className="flex flex-col items-center">
                              <span className="text-gray-600 mb-1">
                                Rating:
                              </span>
                              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                {/*  use [...Array(5)] to create an array with 5 elements, as i want to display 5 stars. */}
                                {[...Array(5)].map((_, index) => (
                                  <svg
                                    key={index}
                                    className={`w-4 h-4 ${
                                      parseInt(review?.reviewData.rating) >
                                      index
                                        ? "text-yellow-300"
                                        : "text-gray-200 dark:text-gray-600"
                                    }`}
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 20"
                                  >
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <p>{review?.reviewData.review}</p>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Right Side Menu */}
            <div className="w-2/6">
              <div className="bg-white shadow px-4 py-5 rounded-lg">
                <h2 className="text-2xl font-bold pb-4">
                  Get More Information
                </h2>
                <div className="flex items-center gap-5 mb-4">
                  <img
                    className="w-14 h-14 rounded-full"
                    src={agent_image}
                    alt=""
                  />
                  <div>
                    <h3 className="font-bold">{agent_name}</h3>
                    <p>+88909***876</p>
                  </div>
                </div>
                <div>
                  <button className="uppercase w-full border border-[#09BE51] bg-[#09BE51] hover:bg-transparent text-white py-1 text-lg px-6 hover:border hover:border-[#09BE51] hover:text-[#09BE51] duration-300 cursor-pointer">
                    Contact Agent
                  </button>
                </div>
              </div>
              <div className="p-4 shadow rounded-lg mt-5">
                <h3 className="text-xl font-bold py-3">Property Description</h3>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default PropertyDetails;
