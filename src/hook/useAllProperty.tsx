import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useAllProperty = () => {
  const axiosPublic = useAxiosPublic();
  const {
    refetch,
    data: allProperty = [],
    isPending: loading,
  } = useQuery({
    queryKey: ["allProperty"],
    queryFn: async () => {
      const res = await axiosPublic.get("/properties");
      return res.data?.allProperty;
    },
  });
  return [allProperty, refetch, loading];
};

export default useAllProperty;
