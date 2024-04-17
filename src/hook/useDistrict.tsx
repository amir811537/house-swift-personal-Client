import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useDistrict = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: propertyDistrict = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["propertyDistrict"],
    queryFn: async () => {
      const res = await axiosPublic.get("/propertyDistrict");
      return res.data;
    },
  });

  return [propertyDistrict, loading, refetch];
};

export default useDistrict;
