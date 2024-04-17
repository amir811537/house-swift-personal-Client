import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useWishlist = () => {
    //tan stack query
    const axiosPublic = useAxiosPublic();
    const {user} = useAuth();
    const {refetch, data: wishlist = [] , isPending} = useQuery({
        queryKey: ['wishlist', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/wishlists?email=${user.email}`);
            return res.data;
        }
    })
    return [wishlist, refetch , isPending];
};

export default useWishlist;