import { Link } from "react-router-dom";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import Popular from "./Popular";
// import { useEffect, useState } from "react";
// import useAllProperty from "../../../hook/useAllProperty";
import { Key } from "react";
import usePopularProperty from "../../../hook/usePopularProperty";

const Populars = () => {
  const [popularProperty, loading] = usePopularProperty();

  if (loading) {
    return <p>loading</p>;
  }
  return (
    <div>
      <div>
        <SectionTitle first="Best" second="Selling"></SectionTitle>
        <div className="max-w-7xl mx-auto p-4 md:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-8">
          {popularProperty?.map(
            (
              popular: {
                _id: string;
                name: string;
                upazila: string;
                district: string;
                description: string;
                available_date: string;
                rent_price: number;
                available_quantity: string;
                image: string;
                bedroom: number;
                bathroom: number;
                area: number;
                agent_name: string;
                agent_image: string;
              },
              idx: Key | null | undefined
            ) => (
              <Popular key={idx} popular={popular}></Popular>
            )
          )}
        </div>
        <div className="flex justify-center mb-3">
          <Link to="/allProperties">
            <button className="uppercase border border-[#09BE51] bg-[#09BE51] hover:bg-transparent text-white py-1 text-lg px-6 hover:border hover:border-[#09BE51] hover:text-[#09BE51] duration-300 cursor-pointer">
              See All
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Populars;
