// Mybooking.tsx

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider/AuthProvider";
import axios from "axios";
import MyBookingCard from "./Mybookingcard";
import Swal from "sweetalert2";
import dipjolIMg from "./../.././../assets/images/dipjol.jpg";

interface Booking {
  agent_email: string;
  agent_name: string;
  name: string;
  upazila: string;
  district: string;
  rent_price: number;
  available_quantity: number;
  bedroom: number;
  bathroom: number;
  Chack_In_Date: string;
  Chack_out_Date: string;
  area: string;
  image: string;
  agent_image: string;
  userEmail: string;
  _id: string;
}

const MyBooking: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const url = `https://house-swift-web-creations-server-six.vercel.app/mybookings?email=${user.email}`;
  useEffect(() => {
    axios.get(url).then((res) => {
      setBookings(res.data);
    });
  }, [url, user]);

  const calculateTotalAmount = () => {
    return bookings.reduce((total, booking) => {
      return total + parseInt(String(booking.rent_price));
    }, 0);
  };
  
  const handleCancel = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://house-swift-web-creations-server-six.vercel.app/mybooking/${id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
          })
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Your booking has been canceled.",
                "success"
              );
              const remaining = bookings.filter(
                (booking) => booking._id !== id
              );
              setBookings(remaining);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            Swal.fire(
              "Error",
              "An error occurred while canceling the booking.",
              "error"
            );
          });
      }
    });
  };

  const handleSubmit = () => {
    const email = user.email;

    const orders = bookings.map((booking) => ({
      houseName: booking.name,
      id: booking._id,
      email: email,
      price: calculateTotalAmount(),
    }));

    console.log(orders);

    fetch("https://house-swift-web-creations-server-six.vercel.app/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orders),
    })
      .then((response) => response.json())
      .then((result) => {
        window.location.replace(result.url);
        console.log(result);
      });
  };

  const totalAmount = calculateTotalAmount();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {bookings.map((singleBooking) => (
          <MyBookingCard
            key={singleBooking._id}
            singelbooking={singleBooking}
            handelCencel={handleCancel}
          />
        ))}
      </div>
      <div className="my-10">
        {totalAmount > 0 ? (
          <div className="flex justify-center mx-auto">
            <button
              onClick={handleSubmit}
              className="uppercase border border-[#8833a2] bg-[#8833a2] hover:bg-transparent text-white py-1 text-lg px-6 md:ml-8 hover:border hover:border-[#8833a2] hover:text-[#8833a2] duration-300 cursor-pointer"
            >
              {`Pay now - Total Amount: $${totalAmount}`}
            </button>
          </div>
        ) : (
          <div className="flex-1 justify-center items-center">
            <div className="flex justify-center mx-auto">
              <img
                className="h-96 w-96"
                src={dipjolIMg}
                alt="dipjol img"
              />
            </div>
            <h2 className="text-center">Please add some house</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooking;
