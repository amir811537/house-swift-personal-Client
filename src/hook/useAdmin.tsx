import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";



const useAdmin = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosPublic();
    const {data: isAdmin } = useQuery({
        queryKey: [user?.email, "isAdmin"],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/propertyUsers/admin/${user.email}`);
            return res.data?.admin;
        }
    })
    return [isAdmin]
};

export default useAdmin;