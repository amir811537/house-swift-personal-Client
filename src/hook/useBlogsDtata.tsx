import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
const useBlogsDtata = () => {
  const axiosPublic = useAxiosPublic();
  const {
    refetch,
    data: blogsData = [],
    isPending: loading,
  } = useQuery({
    queryKey: ["blogsData"],
    queryFn: async () => {
      const res = await axiosPublic.get("/blogsData");
      return res.data;
    },
  });
  return [blogsData, refetch, loading];
};

export default useBlogsDtata;
