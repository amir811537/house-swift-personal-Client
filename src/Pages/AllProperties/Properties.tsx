/* eslint-disable @typescript-eslint/no-explicit-any */
import { Key,useContext, useEffect, useState } from "react";
import SectionTitle from "../../Component/SectionTitle/SectionTitle";
import { motion } from "framer-motion";
import { GrFormSearch } from "react-icons/gr";
import Property from "./Property";
import "./properties.css";
import useAllProperty from "../../hook/useAllProperty";
import TransitionEffect from "../../Component/TransitionEffect/TransitionEffect";
import useAllPropertyPagination from "../../hook/useAllPropertyPagination";
import Recommendation from "./Recommendation";
import axios from "axios";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
// import Propertyfilter from "./Propertyfilter";
// import { dividerClasses } from "@mui/material";
// import _default from "@emotion/styled";

const Properties = () => {
  const [allProperty, refetch] = useAllProperty();
  const [filteredProperty,setFilterProperty]=useState([]);
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(0);
  const [recommendationText, setRecommendationText] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [propertyPerPage] = useAllPropertyPagination(
    currentPage,
    itemsPerPage,
    selectedType
  );


// const [allproduct,setAllproduct]=useState([]);

// useEffect(()=>{
//   axios.get("https://house-swift-web-creations-server-six.vercel.app/properties").then((res) => {
//     setAllproduct(res.data);
//   });


// },[])


// console.log(allproduct)
// const [selected,setSelected]=useState<string[]>([])
const [filterValues, setFilterValues] = useState<{ [key: number]: boolean }>({
  100: false,
  500: false,
  1000: false,
  1500: false,
  2000: false,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
// const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
//   const activeData = e.target.checked;
//   console.log(activeData, "activedata");

//   if (activeData === true) {
//     setSelected(oldData => [...oldData, e.target.value]);
//   } else {
//     setSelected(selected.filter(values=>values!==e.target.value));
//   }
// }

useEffect(()=>{
  const filteredResult = allProperty.filter((item: { rent_price: any; }) => {
    const rentPrice = item.rent_price; 

    return (
      (filterValues[100] && rentPrice >= 100 && rentPrice <= 500) ||
      (filterValues[500] && rentPrice >= 501 && rentPrice <= 1000) ||
      (filterValues[1000] && rentPrice >= 1001 && rentPrice <= 1500) ||
      (filterValues[1500] && rentPrice >= 1501 && rentPrice <= 2000) ||
      (filterValues[2000] && rentPrice > 2000)
    );
  });
  console.log('====>filter',filteredResult)
  setFilterProperty(filteredResult);
},[filterValues,allProperty])
// console.log("++++++++++>",allProperty)


  const { searchText, showText, setShowText } = useContext(AuthContext);

  const handleSearch = (event: { target: { value: string } }) => {
    const selectedValue = event.target.value;
    setSelectedType(selectedValue);
    setShowText(true);
    if (selectedValue.length > 0) {
      axios
        .get(
          `https://house-swift-web-creations-server-six.vercel.app/recommendation?searchData=${selectedValue}`
        )
        .then((res) => {
          setRecommendationText(res.data);
        });
    }
    refetch();
  };
  const count = allProperty.length;
  const totalPage = Math.ceil(count / itemsPerPage);
  const pages = [...Array(totalPage).keys()];

  const handlePrev = () => {
    if (currentPage + 1 === 1) {
      setCurrentPage(totalPage - 1);
    }
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
    // refetch();
  };
  const handleNext = () => {
    if (currentPage + 1 === totalPage) {
      setCurrentPage(0);
    }
    if (currentPage < totalPage - 1) {
      setCurrentPage(currentPage + 1);
    }
    // refetch();
  };

  useEffect(() => {
    setSelectedType(searchText);
  }, [searchText]);
  const handleCheckboxChange = (value: number) => {
    setFilterValues((prevValues) => ({ ...prevValues, [value]: !prevValues[value] }));
  };
// console.log('filter vales are ',filterValues)
  return (
    <>
      <div className="py-24">
        <div>




          <SectionTitle first="All" second="Properties"></SectionTitle>
          <TransitionEffect></TransitionEffect>
          <div className="md:px-20  py-3 flex flex-col justify-end items-center max-w-7xl mx-auto">
            <div className="flex justify-end relative items-center">
              <input
                className="px-2 py-2 w-56 border-2 border-gray-500 rounded-lg"
                type="text"
                name="item"
                id="item"
                placeholder="Search Upazila..."
                onChange={handleSearch}
                value={selectedType}
              />
              <span className="absolute mr-1">
                <GrFormSearch className="text-black text-3xl"></GrFormSearch>
              </span>
            </div>
<div className="py-8">
{/* <Propertyfilter></Propertyfilter> */}



<div className="flex flex-col gap-2">
    <div>
        <label className="inline-flex items-center" htmlFor="redCheckBox">
          <input id="redCheckBox" type="checkbox" className="w-4 h-4 accent-red-600"  onChange={() => handleCheckboxChange(100)}
          checked={filterValues[100]}/>
          <span className="ml-2">100 to 500</span>
        </label>
    </div>
    <div>
        <label className="inline-flex items-center" htmlFor="tealCheckBox">
          <input id="tealCheckBox" type="checkbox" className="w-4 h-4 accent-teal-600"  onChange={() => handleCheckboxChange(500)}
          checked={filterValues[500]}/>
          <span className="ml-2">501 to 1000</span>
        </label>
    </div>
    <div>
        <label className="inline-flex items-center" htmlFor="yellowCheckBox">
          <input id="yellowCheckBox" type="checkbox" className="w-4 h-4 accent-yellow-600"  onChange={() => handleCheckboxChange(1000)}
          checked={filterValues[1000]}/>
          <span className="ml-2">1001 to 1500</span>
        </label>
    </div>
    <div>
        <label className="inline-flex items-center" htmlFor="grayCheckBox">
          <input id="grayCheckBox" type="checkbox" className="w-4 h-4 accent-gray-700"  onChange={() => handleCheckboxChange(1500)}
          checked={filterValues[1500]}/>
          <span className="ml-2">1501 to 2000</span>
        </label>
    </div>
    <div>
        <label className="inline-flex items-center" htmlFor="indigoCheckBox">
          <input id="indigoCheckBox" type="checkbox" className="w-4 h-4 accent-indigo-700"  onChange={() => handleCheckboxChange(2000)}
          checked={filterValues[2000]} />
          <span className="ml-2">Above 20000</span>
        </label>
    </div>
</div>


</div>

            {selectedType && showText && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 1 }}
                className="bg-gray-300 rounded-md z-20 absolute top-56 mt-5 w-56 block"
              >
                {recommendationText.map((item) => {
                  return <Recommendation item={item}></Recommendation>;
                })}
              </motion.div>
            )}
          </div>
          <div className="max-w-7xl mx-auto p-4 md:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-8">
           {filteredProperty.length>0?<>   {
            filteredProperty.map(
              (
                property: {
                  _id: string;
                  name: string;
                  upazila: string;
                  district: string;
                  available_date: string;
                  description: string;
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
                <Property key={idx} property={property}></Property>
              )
            )}</>:<>   {
            propertyPerPage.map(
              (
                property: {
                  _id: string;
                  name: string;
                  upazila: string;
                  district: string;
                  available_date: string;
                  description: string;
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
                <Property key={idx} property={property}></Property>
              )
            )}</>}
           
         
          </div>
          <div className="text-center pt-2">
            <button
              onClick={handlePrev}
              className="px-4 py-2 rounded-sm mr-2 bg-[#fca1296b] hover:text-white hover:bg-[#FCA129] duration-300"
            >
              Prev
            </button>
            {pages?.map((page) => (
              <button
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-sm mr-2 my-1 bg-orange-100 hover:bg-[#FCA129] duration-300 ${
                  currentPage === page ? "selected" : undefined
                }`}
                key={page}
              >
                {page + 1}
              </button>
            ))}
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-sm mr-2 bg-[#fca1296b] hover:text-white hover:bg-[#FCA129] duration-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Properties;
