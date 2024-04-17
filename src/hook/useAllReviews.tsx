import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useAllReviews = () => {
  const axiosPublic = useAxiosPublic();
  const {
    refetch : reReviewFetch,
    data: allRewiews = [],
    isPending: loading,
  } = useQuery({
    queryKey: ["allRewiews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allRewiews");
      return res.data;
    },
  });
  return [allRewiews, reReviewFetch, loading];
};

export default useAllReviews;