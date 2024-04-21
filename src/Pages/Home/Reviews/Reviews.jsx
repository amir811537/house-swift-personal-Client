import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
import Slider from "react-slick";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import { useEffect, useState } from "react";
import SingleReviews from "./SingleReviews";
export default function Reviews() {
  const [allReviews, setAllReview] = useState([]);
  useEffect(() => {
    fetch(
      "https://house-swift-web-creations-server-six.vercel.app/allRewiews"
    )
      .then((res) => res.json())
      .then((data) => setAllReview(data));
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="py-6 pb-16 px-8 rounded-lg text-center hidden md:block">
      <SectionTitle first="Our" second="Reviews"></SectionTitle>
      <Slider {...settings}>
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          allReviews?.slice(0, 6)?.map((review) => (
            <SingleReviews key={review._id} review={review}></SingleReviews>
          ))
        }
      </Slider>
    </div>
  );
}
