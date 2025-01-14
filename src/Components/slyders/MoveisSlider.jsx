import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import useMoviesClient from "../../Hooks/useMoviesClient";
import { useEffect } from 'react';

function MoviesSlider() {
  const { movies, movisLoading ,getmovies} = useMoviesClient();
  useEffect(()=>{
    getmovies();
    
  },[])

  if (movisLoading) return <>loading . . .</>;

  return (
    <div>
      <div className="w-full flex flex-col justify-center items-center  overflow-hidden">
        <div className="w-[80%] my-10 rounded-2xl p-4">
          <div className="relative w-full py-10">
            <Swiper
              modules={[Navigation, Autoplay]}
              loop={true}
              slidesPerView={1}
              spaceBetween={1}
              autoplay={{
                delay: 4000,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
              }}
              navigation={{
                nextEl: ".button-next-movie-slide",
                prevEl: ".button-prev-movie-slide",
              }}
              speed={600}
              breakpoints={{
                1440: { slidesPerView: 3, spaceBetween: 30 },
                1024: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 10 },
                480: { slidesPerView: 1, spaceBetween: 5 },
              }}
            >
              {movies.map((movie, index) => (
                <SwiperSlide key={index}>
                  <div
          
            className="relative bg-cover bg-center bg-no-repeat lg:my-6 h-[400px] sm:h-[450px] md:h-[500px] w-full sm:w-[300px] md:w-[350px]  cursor-pointer transition-transform transform hover:scale-105 shadow-2xl rounded-lg overflow-hidden"
            style={{
              backgroundImage: `url('${movie.posterImage || '/2405f5d1220d45fef53df0bfe804e104.jpg'}')`,
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-4 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div>
                <h2 className="text-lg text-white text-center font-bold">
                  {movie.title || `Movie Title ${index + 1}`}
                </h2>
                <p className="text-white text-center">
                  Short description of the movie goes here.
                </p>
              </div>

              
            </div>
          </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="absolute top-1/2 left-5 transform -translate-y-1/2 button-prev-movie-slide z-10">
              <button className="bg-yellow-500 text-white rounded-full p-3 hover:bg-yellow-400 transition">
                Prev
              </button>
            </div>
            <div className="absolute top-1/2 right-5 transform -translate-y-1/2 button-next-movie-slide z-10">
              <button className="bg-yellow-500 text-white rounded-full p-3 hover:bg-yellow-400 transition">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviesSlider;
