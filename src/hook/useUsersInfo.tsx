import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUsersInfo = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: usersInfo = [],
    refetch,
    isPending: loading,
  } = useQuery({
    queryKey: ["propertyUsers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/propertyUsers");
      return res.data;
    },
  });
  return [usersInfo, refetch, loading];
};

export default useUsersInfo;
