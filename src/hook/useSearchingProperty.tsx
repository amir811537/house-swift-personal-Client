import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
const useSearchingProperty = () => {
  const axiosPublic = useAxiosPublic();
  const {
    refetch,
    data: availableProperty = [],
    isPending: loading,
  } = useQuery({
    queryKey: ["availableProperty"],
    queryFn: async () => {
      const res = await axiosPublic.get("/availableProperty");
      return res.data;
    },
  });
  return [availableProperty, refetch, loading];
};

export default useSearchingProperty;
