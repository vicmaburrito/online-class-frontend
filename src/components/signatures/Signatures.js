import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper';
import { Link } from 'react-router-dom';

// eslint-disable-next-line import/named
import { selectAllSignatures, getSignatures } from '../../redux/Signatures/SignatureSlice';
import '../../styles/Signatures.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// eslint-disable-next-line import/extensions
import Sidebar from '../../pages/Sidebar';

const Signatures = () => {
  const dispatch = useDispatch();
  const Signatures = useSelector(selectAllSignatures);

  useEffect(() => {
    dispatch(getSignatures());
  }, [dispatch]);

  return (
    <>
      <Sidebar />
      <div className="main-container ">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-center text-2xl font-extrabold text-gray-800 tracking-widest mb-3">
            LATEST Signature
          </h1>
          <p className="text-sm text-zinc-500">Please select a Signature</p>
        </div>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={() => {}}
          onSlideChange={() => {}}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1124: {
              slidesPerView: 3,
            },
          }}
        >
          {Signatures.map((signature) => (
            <SwiperSlide key={signature.id}>
              <Link to={`/Signatures/${signature.id}`}>
                <div className="flex flex-col items-center text-center mt-20">
                  <img
                    // src={class.image}
                    alt="class"
                    className="class-image shadow-lg"
                  />

                  <h2 className="text-bold text-xl text-gray-800">
                    {signature.name}
                  </h2>
                  <p className="text-sm text-zinc-500 px-12 lg:px-6  ">
                    {signature.description.substring(0, 120)}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Signatures;
