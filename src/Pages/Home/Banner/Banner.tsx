import img1 from "../../../assets/images/slide1.jpg";
import img2 from "../../../assets/images/slide2.jpg";
import img3 from "../../../assets/images/slide3.jpg";
import img4 from "../../../assets/images/slide4.jpg";

import banner from "../../../assets/images/banner.jpg";

const Banner = () => {
  return (
    <div>
      <div className="carousel w-full h-[540px]">
        <div
          id="slide1"
          className="carousel-item relative w-full"
        >
          <img
            src={banner}
            className="w-full"
          />
          <div className="absolute flex items-center h-full gap-6 left-0 right-0 bottom-0  bg-gradient-to-r from-black to-gray opacity-80">
            <div className="max-w-7xl mx-auto px-4 md:px-20 flex justify-start w-full">
              <div className="text-white space-y-5 w-full">
                <h2 className="text-3xl md:text-5xl font-bold">
                  <span className="text-[#fca129]"> Good </span>
                  Service is <br /> our passion
                </h2>
                <p>
                  No matter what the weather, no matter what the situation we
                  are in, if we have <br /> the right perspective in life, life
                  will always be beautiful!
                </p>
                <div className="flex items-center">
                  <button className="uppercase border border-[#09BE51] bg-[#09BE51] hover:bg-transparent text-white py-2 text-lg px-6 hover:border hover:border-[#09BE51] hover:text-[#09BE51] duration-300 cursor-pointer">
                    Special Offer
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute flex justify-end gap-6 transform -translate-y-1/2 left-5 right-5 bottom-0">
            <a
              href="#slide5"
              className="btn btn-circle bg-white"
            >
              ❮
            </a>
            <a
              href="#slide2"
              className="btn btn-circle bg-white"
            >
              ❯
            </a>
          </div>
        </div>
        <div
          id="slide2"
          className="carousel-item relative w-full"
        >
          <img
            src={img1}
            className="w-full rounded-xl"
          />
          <div className="absolute flex items-center h-full gap-6 left-0 right-0 bottom-0  bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
            <div className="max-w-7xl mx-auto px-4 md:px-20 flex justify-start w-full">
              <div className="text-white space-y-5 w-full">
                <h2 className="text-3xl md:text-5xl font-bold">
                  <span className="text-[#fca129]"> Good </span>Service is{" "}
                  <br /> our passion
                </h2>
                <p>
                  In a forgotten library, a mysterious book unveils ancient
                  secrets, drawing readers into a realm where shadows <br />{" "}
                  intertwine with reality, weaving a spellbinding narrative of
                  enigmas and intrigue.
                </p>
                <div className="flex items-center">
                  <button className="uppercase border border-[#09BE51] bg-[#09BE51] hover:bg-transparent text-white py-2 text-lg px-6 hover:border hover:border-[#09BE51] hover:text-[#09BE51] duration-300 cursor-pointer">
                    Special Offer
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex justify-end gap-6 transform -translate-y-1/2 left-5 right-5 bottom-0">
            <a
              href="#slide1"
              className="btn btn-circle bg-white"
            >
              ❮
            </a>
            <a
              href="#slide3"
              className="btn btn-circle bg-white"
            >
              ❯
            </a>
          </div>
        </div>
        <div
          id="slide3"
          className="carousel-item relative w-full"
        >
          <img
            src={img2}
            className="w-full rounded-xl"
          />
          <div className="absolute flex items-center h-full gap-6 left-0 right-0 bottom-0  bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
            <div className="max-w-7xl mx-auto px-4 md:px-20 flex justify-start w-full">
              <div className="text-white space-y-5 w-full">
                <h2 className="text-3xl md:text-5xl  font-bold">
                  <span className="text-[#fca129]"> Good </span>Service is{" "}
                  <br /> our passion
                </h2>
                <p>
                  Within an ancient tome, cryptic symbols weave tales of
                  enigmatic realms. Readers brave <br /> its pages, unlocking
                  mysteries that blur the line between reality and imagination,
                  leaving them spellbound
                </p>
                <div className="flex items-center">
                  <button className="uppercase border border-[#09BE51] bg-[#09BE51] hover:bg-transparent text-white py-2 text-lg px-6 hover:border hover:border-[#09BE51] hover:text-[#09BE51] duration-300 cursor-pointer">
                    Special Offer
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex justify-end gap-6 transform -translate-y-1/2 left-5 right-5 bottom-0">
            <a
              href="#slide2"
              className="btn btn-circle bg-white"
            >
              ❮
            </a>
            <a
              href="#slide4"
              className="btn btn-circle bg-white"
            >
              ❯
            </a>
          </div>
        </div>
        <div
          id="slide4"
          className="carousel-item relative w-full"
        >
          <img
            src={img3}
            className="w-full rounded-xl"
          />
          <div className="absolute flex items-center h-full gap-6 left-0 right-0 bottom-0  bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
            <div className="max-w-7xl mx-auto px-4 md:px-20 flex justify-start w-full">
              <div className="text-white space-y-5 w-full">
                <h2 className="text-3xl md:text-5xl  font-bold">
                  <span className="text-[#fca129]"> Good </span>Service is{" "}
                  <br /> our passion
                </h2>
                <p>
                  An enthralling novel immerses readers in captivating
                  narratives, exploring diverse lives, love, and challenges.{" "}
                  <br /> Through vivid characters and compelling plots, it
                  evokes emotions, sparking introspection and profound
                  connections
                </p>
                <div className="flex items-center">
                  <button className="uppercase border border-[#09BE51] bg-[#09BE51] hover:bg-transparent text-white py-2 text-lg px-6 hover:border hover:border-[#09BE51] hover:text-[#09BE51] duration-300 cursor-pointer">
                    Special Offer
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex justify-end gap-6 transform -translate-y-1/2 left-5 right-5 bottom-0">
            <a
              href="#slide3"
              className="btn btn-circle bg-white"
            >
              ❮
            </a>
            <a
              href="#slide5"
              className="btn btn-circle bg-white"
            >
              ❯
            </a>
          </div>
        </div>
        <div
          id="slide5"
          className="carousel-item relative w-full"
        >
          <img
            src={img4}
            className="w-full rounded-xl"
          />
          <div className="absolute flex items-center h-full gap-6 left-0 right-0 bottom-0  bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
            <div className="max-w-7xl mx-auto px-4 md:px-20 flex justify-start w-full">
              <div className="text-white space-y-5 w-full">
                <h2 className="text-3xl md:text-5xl  font-bold">
                  <span className="text-[#fca129]"> Good </span>Service is our{" "}
                  <br />
                  passion
                </h2>
                <p>
                  In a world of emotions, a drama book unfolds human
                  complexities, depicting love, betrayal, and <br /> resilience.
                  Characters navigate life is twists, evoking empathy, and
                  revealing the depths of the human spirit.
                </p>
                <div className="flex items-center">
                  <button className="uppercase border border-[#09BE51] bg-[#09BE51] hover:bg-transparent text-white py-2 text-lg px-6 hover:border hover:border-[#09BE51] hover:text-[#09BE51] duration-300 cursor-pointer">
                    Special Offer
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex justify-end gap-6 transform -translate-y-1/2 left-5 right-5 bottom-0">
            <a
              href="#slide4"
              className="btn btn-circle bg-white"
            >
              ❮
            </a>
            <a
              href="#slide1"
              className="btn btn-circle bg-white"
            >
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
