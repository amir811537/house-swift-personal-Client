import { Key } from "react";
import SectionTitle from "../../Component/SectionTitle/SectionTitle";
import useAllProperty from "../../hook/useAllProperty";
import useSearchingProperty from "../../hook/useSearchingProperty";
import SearchingHouse from "./SearchingHouse";

const SearchingHouses = () => {
  const [allProperty] = useAllProperty();
  const [availableProperty] = useSearchingProperty();
  const lastSearchingProperty = availableProperty[availableProperty.length - 1];

  const searchingAvailableProperty = allProperty.filter(
    (availableProperty: {
      district: string;
      upazila: string;
      bedroom: number;
    }) =>
      availableProperty?.district
        ?.toLowerCase()
        .includes(lastSearchingProperty?.district?.toLowerCase()) &&
      availableProperty?.upazila
        ?.toLowerCase()
        .includes(lastSearchingProperty?.upazila?.toLowerCase()) &&
      availableProperty?.bedroom == lastSearchingProperty?.bedroom
  );
  // console.log(searchingAvailableProperty);
  return (
    <>
      <div>
        <div className="mt-24">
          <SectionTitle first="Available" second="For You"></SectionTitle>
          <div className="max-w-7xl mx-auto p-4 md:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-8">
            {searchingAvailableProperty.map(
              (
                searching: {
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
                  agent_image: string; // useEffect(() => {
                },
                idx: Key | null | undefined
              ) => (
                <SearchingHouse
                  key={idx}
                  searching={searching}
                ></SearchingHouse>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchingHouses;
