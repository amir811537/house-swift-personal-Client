/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";

const Mybookingcard = ({ singelbooking,handelCencel }) => {
    const {
        agent_email,
        agent_name,
        name,
        upazila,
        district,
        rent_price,
        available_quantity,
        bedroom,
        bathroom,
        Chack_In_Date,
        Chack_out_Date,
        area,
        image,
        agent_image,
        userEmail,
        _id
    } = singelbooking;

    const navigate=useNavigate()
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (id: any) => {
    navigate(`/updatebooking/${id}`)
   
   };

    // console.log("=========>", singelbooking);

    return (
        <>
           <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-8">
            <div>
                <div className="flex flex-col md:flex-row border-b border-gray-400 p-4 md:p-10">
                    <div className="flex-shrink-0">
                        <img
                            src={image}
                            alt="Product image"
                            className="w-16 h-16 object-cover rounded-full"
                        />
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6">
                        <h2 className="text-lg font-bold">{name}</h2><span>({bedroom} bedroom, {bathroom} bathroom)</span>
                        <h3>{district},{upazila}</h3>
                        <p></p>
                        <div className="flex items-center">
                            <span className=" mr-1 ml-1 font-bold">Price:</span>${rent_price}
                        </div>
                        <div className="flex items-center">
        <span className=" mr-1 ml-1 font-bold">Booking Date:</span>
        {Chack_In_Date} <span className=" mr-1 ml-1 font-bold">to </span> {Chack_out_Date}
      </div>

                        <div className="flex justify-between mt-4">
                            <button className="w-fit border border-[#09BE51] bg-[#09BE51] rounded-full hover:bg-transparent text-white py-1 text-lg px-6 md:ml-8 hover:border hover:border-[#09BE51] hover:text-[#09BE51] duration-300 cursor-pointer"
                                onClick={() => handleEdit(_id)}
                            >
                                Edit Date
                            </button>
                            <button
                                onClick={() => handelCencel(_id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Mybookingcard;
