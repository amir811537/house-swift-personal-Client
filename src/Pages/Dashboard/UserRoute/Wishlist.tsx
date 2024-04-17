import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination } from "@mui/material";
import Swal from "sweetalert2";
import useWishlist from "../../../hook/useWishlist";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import { FaDeleteLeft } from "react-icons/fa6";

type wishlistProperty = {
  _id: string,
  wishlistId: string,
  name: string,
  // upazila,
  // district,
  image: string,
  rent_price: number,

  userEmail: string,
  // available_quantity,
  // bedroom,
  // bathroom,
  area: string,
  // available_date,

  agent_name: string,
  agent_image: string,
};



export const Wishlist: React.FC = () => {
  const [wishlist, refetch] = useWishlist(); // Assuming User type
  const axiosPublic = useAxiosPublic();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteWishlist = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/wishlists/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting wishlist:", error);
            Swal.fire({
              title: "Error!",
              text: "There was an error deleting the wishlist.",
              icon: "error",
            });
          });
      }
    });
  };


  return (
    <>
      <div>
        <Helmet>
          <title>House Swift | Dashboard | My Wishlist</title>
        </Helmet>
        <TableContainer className="mt-10" component={Paper}>
          <Table  aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <span className="text-xl font-semibold text-black">Serial</span>
                </TableCell>
                <TableCell>
                  <span className="text-xl font-semibold text-black">
                    P. Image
                  </span>
                </TableCell>
                <TableCell align="left">
                  <span className="text-xl font-semibold text-black">
                    Name
                  </span>
                </TableCell>
                <TableCell align="left">
                  <span className="text-xl font-semibold text-black">
                    Agent Name
                  </span>
                </TableCell>

                <TableCell align="left">
                  <span className="text-xl font-semibold text-black">
                    A. Image
                  </span>
                </TableCell>
                <TableCell align="left">
                  <span className="text-xl font-semibold text-black">
                  Price
                  </span>
                </TableCell>
                <TableCell align="left">
                  <span className="text-xl font-semibold text-black">
                    Delete
                  </span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wishlist
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: wishlistProperty , index: number) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      <img
                        className="w-14 h-14 rounded-full"
                        src={row.image}
                        alt={row.name}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <span className=" flex w-max text-white rounded-md p-2 border box-border bg-emerald-500">
                        {row.name}
                      </span>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <span className=" text-white rounded-md p-2 border bg-cyan-500 box-border">
                        {row.agent_name}
                      </span>
                    </TableCell>

                    <TableCell component="th" scope="row">
                    <img
                        className="w-14 h-14 rounded-full"
                        src={row.agent_image}
                        alt={row.agent_name}
                      />
                    </TableCell>

                    <TableCell component="th" scope="row">
                    <span className=" text-white rounded-md p-2 border bg-[#FCA129] box-border">
                        {row.rent_price}
                      </span>
                    </TableCell>
                    <TableCell component="th" scope="row">
                    <button

                    onClick={() => handleDeleteWishlist(row._id)}
                        className="btn btn-ghost btn-lg text-red-600"
                      >
                        <FaDeleteLeft />
                      </button>

                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={wishlist.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    </>
  );
};


