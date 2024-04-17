import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
const usePopularProperty = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: popularProperty = [],
    isPending: loading,
  } = useQuery({
    queryKey: ["popularProperty"],
    queryFn: async () => {
      const res = await axiosPublic.get("/popularProperty");
      return res.data;
    },
  });
  return [popularProperty, loading];
};

export default usePopularProperty;

// const axiosPublic = useAxiosPublic();
// const { data: popular = [], isPending: loading } = useQuery({
//   queryKey: ["popularItem"],
//   queryFn: async () => {
//     const res = await axiosPublic.get(`/popularItem`);
//     return res.data;
//   },
// });
// console.log(popular);
