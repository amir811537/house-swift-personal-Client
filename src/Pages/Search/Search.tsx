import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../../hook/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useDistrict from "../../hook/useDistrict";
import useUpazila from "../../hook/useUpazila";
import useAllProperty from "../../hook/useAllProperty";

type allData = {
  arrivalDate: string;
  bedroom: number;
  district: string;
  upazila: string;
};

export const Search = () => {
  const [allProperty] = useAllProperty();
  const [propertyDistrict] = useDistrict();
  const [propertyUpazila] = useUpazila();
  const [selectUpazila, setSelectUpazila] = useState(propertyUpazila);
  // console.log(allProperty);
  const [searching, setSearching] = useState([]);
  const naviGtae = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit } = useForm<allData>();
  console.log(searching);

  const onSubmit = (data: allData) => {
    // console.log(data);
    const filterDistrict = allProperty?.filter((item: { district: string }) =>
      item?.district?.toLowerCase().includes(data?.district.toLowerCase())
    );
    if (filterDistrict?.length <= 0) {
      toast("No room available in this District");
      return;
    }
    // console.log(filterDistrict);
    const filterUpazila = filterDistrict?.filter((item: { upazila: string }) =>
      item?.upazila?.toLowerCase().includes(data?.upazila.toLowerCase())
    );
    // console.log(filterUpazila);
    if (filterUpazila?.length <= 0) {
      toast("No room available in this upazila");
      return;
    }
    const roomFilter = filterUpazila?.filter(
      (item: { bedroom: number }) => item?.bedroom == data?.bedroom
    );

    if (roomFilter?.length <= 0) {
      toast("Your selected room is not available in this loaction");
      return;
    }
    setSearching(roomFilter);

    const arrivalDate = data.arrivalDate;
    const bedroom = data.bedroom;
    const district = data.district;
    const upazila = data.upazila;
    const addAvailableProperty = {
      arrivalDate,
      bedroom,
      district,
      upazila,
    };
    // console.log(addAvailableProperty);
    axiosPublic.post("/availableProperty", addAvailableProperty).then((res) => {
      // if (res.data.insertedId) {
      //   Swal.fire({
      //     position: "top",
      //     icon: "success",
      //     title: "Searching Property added  successfully",
      //     showConfirmButton: false,
      //     timer: 1500,
      //   });
      // }
      naviGtae("/searchingProperty");
      console.log(res.data);
    });
  };
  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDistrictName = event.target.value;
    // console.log(`${selectedDistrictName}`);
    const selectedDistrict = propertyDistrict.find(
      (district: { _id: string; name: string }) =>
        district.name === selectedDistrictName
    );
    // console.log(selectedDistrict);
    const selectedUpazila = propertyUpazila.filter(
      (upaZila: { district_id: number }) =>
        upaZila.district_id == selectedDistrict.id
    );
    setSelectUpazila(selectedUpazila);
    // You can perform actions based on the selected district here
  };
  return (
    <>
      <div className="mb-8">
        <section className="-mt-2">
          <div className="bg-teal-500 text-white">
            <div className=" max-w-7xl mx-auto px-16">
              <div className="flex flex-col items-center py-10 text-center lg:py-20">
                <div className="w-full">
                  <div className="mb-8">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-3">
                      Looking for a solution?
                    </h2>
                    <p className="text-lg lg:text-xl opacity-80">
                      Search your House
                    </p>
                  </div>
                  <div className="relative">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        <div>
                          <p className="md:text-left text-center uppercase">
                            Arrival Date
                          </p>
                          <input
                            type="date"
                            {...register("arrivalDate", { required: true })}
                            className="p-4 bg-white w-full text-gray-600 border
                     border-gray-300  focus:outline-none focus:ring 
                    focus:border-blue-300"
                          />
                        </div>
                        <div className="text-center md:text-left">
                          <label
                            htmlFor="roomSelector"
                            className="uppercase block"
                          >
                            Rooms
                          </label>
                          <select
                            id="bedroom"
                            {...register("bedroom", { required: true })}
                            className="p-4 w-full bg-white text-gray-600 border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                          >
                            <option value="1">1 Room</option>
                            <option value="2">2 Rooms</option>
                            <option value="3">3 Rooms</option>
                            <option value="4">4 Rooms</option>
                            <option value="5">5 Rooms</option>
                          </select>
                        </div>
                        <div className="text-center md:text-left">
                          <label
                            htmlFor="roomSelector"
                            className="uppercase block"
                          >
                            DISTRICT
                          </label>
                          <select
                            defaultValue="default"
                            {...register("district", { required: true })}
                            onChange={(e) => handleDistrictChange(e)}
                            name="district"
                            id="district"
                            className="p-4 w-full bg-white text-gray-600 border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                          >
                            <option disabled value="default">
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
                        <div className="text-center md:text-left">
                          <label
                            htmlFor="roomSelector"
                            className="uppercase block"
                          >
                            UPAZILA
                          </label>
                          <select
                            defaultValue="default"
                            {...register("upazila", { required: true })}
                            name="upazila"
                            id="upazila"
                            className="p-4 w-full bg-white text-gray-600 border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                          >
                            <option disabled value="default">
                              select a upazila
                            </option>

                            {selectUpazila.map(
                              (upazila: { _id: string; name: string }) => (
                                <option key={upazila._id} value={upazila.name}>
                                  {upazila.name}
                                </option>
                              )
                            )}
                          </select>
                        </div>

                        {/* <div>
                          <p className="md:text-left text-center uppercase">
                            UPAZILA
                          </p>
                          <input
                            type="text"
                            placeholder="search your location"
                            {...register("location", { required: true })}
                            className="p-4 bg-white w-full text-gray-600 border
                     border-gray-300  focus:outline-none focus:ring 
                    focus:border-blue-300"
                          />
                        </div> */}

                        <div className="md:col-span-1">
                          <button
                            type="submit"
                            className="p-4 hover:bg-white hover:text-[#09BE51] w-full text-white text-xl bg-[#09BE51] mt-[23px] border
                      border-[#09BE51]  focus:outline-white focus:ring 
                     focus:border-blue-300"
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ToastContainer />
      </div>
    </>
  );
};
