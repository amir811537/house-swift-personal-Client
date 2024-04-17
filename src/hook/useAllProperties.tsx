import { useQuery } from "@tanstack/react-query"
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";

export default function useAllProperties() {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const {data : allProperties = [] , isPending : isAllPropertiesPending , refetch} = useQuery({
        queryKey : ['allproperties'],
        queryFn : async () => {
            const res = await axiosPublic.get(`/agentproperties?email=${user?.email}`);
            return res.data;
        }
    })
  return [ allProperties , isAllPropertiesPending  , refetch]
}
