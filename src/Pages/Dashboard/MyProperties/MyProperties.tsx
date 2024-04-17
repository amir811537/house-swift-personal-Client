import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import useAuth from "../../../hook/useAuth";
import Property from "../../AllProperties/Property";

const MyProperties = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data, isLoading } = useQuery({
    queryKey: ["agent Property"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/agentProperties/${user?.email}`);
      return res?.data;
    },
  });
  // console.log(data);

  if (isLoading) {
    return <p>loading...</p>;
  }
  return (
    <div>
      <div className="max-w-7xl mx-auto p-4 md:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-8">
        {data?.map(
          (property: {
            _id: string;
            name: string;
            upazila: string;
            district: string;
            available_date: string;
            description: string;
            rent_price: number;
            available_quantity: string;
            image: string;
            bedroom: number;
            bathroom: number;
            area: number;
            agent_name: string;
            agent_image: string;
          }) => (
            <Property
              key={property._id}
              property={property}
            ></Property>
          )
        )}
      </div>
    </div>
  );
};

export default MyProperties;
