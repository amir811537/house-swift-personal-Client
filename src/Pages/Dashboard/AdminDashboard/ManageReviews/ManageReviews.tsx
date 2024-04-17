import React, { useState } from "react";
import useAllReviews from "../../../../hook/useAllReviews";
import { Rating } from "@mui/material";
import { GrDocumentUpdate } from "react-icons/gr";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination } from "@mui/material";
import { TiDocumentDelete } from "react-icons/ti";
import useAxiosPublic from "../../../../hook/useAxiosPublic";
import Swal from "sweetalert2";

interface Review {
  _id: string;
  reviewData: {
    review: string;
    userEmail: string;
    rating: number;
  };
}

const ManageReviews: React.FC = () => {
  const [allReviews, refetch] = useAllReviews();
  const axiosPublic = useAxiosPublic();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteReview = (reviews: Review) => {
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
        axiosPublic.delete(`/allRewiews/${reviews._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${reviews.reviewData.review} has been deleted.`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <>
      <div className="border p-2 text-2xl font-bold shadow-xl rounded-lg">
        Total Reviews: {allReviews.length}
      </div>

      <div className="overflow-x-auto">
        <TableContainer className="mt-10" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <span className="text-xl font-semibold text-black">ID</span>
                </TableCell>
                <TableCell>
                  <span className="text-xl font-semibold text-black">
                    Email
                  </span>
                </TableCell>
                <TableCell align="left">
                  <span className="text-xl font-semibold text-black">
                    Review
                  </span>
                </TableCell>
                <TableCell align="left">
                  <span className="text-xl font-semibold text-black">
                    Rating
                  </span>
                </TableCell>
                <TableCell align="left">
                  <span className="text-xl font-semibold text-black">
                    Update
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
              {allReviews
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((reviews: Review, index: number) => (
                  <TableRow
                    key={reviews._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {reviews.reviewData.userEmail}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <span>{reviews.reviewData.review}</span>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <span>
                        <Rating
                          style={{ maxWidth: 180 }}
                          value={reviews.reviewData.rating}
                          readOnly
                        />
                      </span>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <button className="btn btn-lg text-2xl hover:bg-green-500 text-white">
                        <GrDocumentUpdate />
                      </button>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <button
                        onClick={() => handleDeleteReview(reviews)}
                        className="btn btn-lg text-2xl hover:bg-red-500 text-white"
                      >
                        <TiDocumentDelete />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={allReviews.length}
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

export default ManageReviews;
