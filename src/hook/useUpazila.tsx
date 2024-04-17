import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUpazila = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: propertyUpazila = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["propertyUpazila"],
    queryFn: async () => {
      const res = await axiosPublic.get("/propertyUpazila");
      return res.data;
    },
  });

  return [propertyUpazila, loading, refetch];
};

export default useUpazila;
