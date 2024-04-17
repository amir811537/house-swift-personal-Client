import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const 
useAllPropertyPagination = (
  currentPage: number,
  itemsPerPage: number,
  selectedType: string
) => {
  const axiosPublic = useAxiosPublic();
  const {
    refetch,
    data: propertyPerPage = [],
    isPending: loading,
  } = useQuery({
    queryKey: ["propertyPerPage", currentPage, itemsPerPage, selectedType],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/properties?page=${currentPage}&size=${itemsPerPage}&searchData=${selectedType}`
      );

      return res.data?.propertyPerPage; // This should be wrapped in a Promise
    },
  });
  return [propertyPerPage, refetch, loading];
};

export default useAllPropertyPagination;
