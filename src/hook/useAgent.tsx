import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';

const useAgent = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosPublic()
    const {data: isAgent, isPending: isAgentLoading } = useQuery({
        queryKey: [user?.email, "isAgent"],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/users/Agent/${user.email}`);
            return res.data?.Agent;
        }
    })
    return [isAgent, isAgentLoading]; 
};

export default useAgent;