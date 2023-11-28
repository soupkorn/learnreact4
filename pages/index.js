import React from "react";
import { useAuth } from "@/context/authProvider";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Index = () => {
  const authContext = useAuth();
  // console.log(authContext.products);
  console.log(authContext.cart);
  return (
    <>
      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <div
            className="w-full h-[500px] bg-cover bg-top"
            style={{ backgroundImage: "url(/images/333.jpg)" }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="w-full h-[500px] bg-cover bg-bottom"
            style={{ backgroundImage: "url(/images/222.jpg)" }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>

      <div className="container">
        <div className="grid grid-cols-12 gap-2 pt-3 ">
          {authContext.products.map((v) => (
            <>
              <div className="col-span-3 hover:ring-1 p-4 border rounded-[6px]">
                <div
                  className="h-[248px] mx-auto bg-cover bg-center rounded-[6px]"
                  style={{
                    backgroundImage: `url(${process.env.NEXT_PUBLIC_PRODUCT_THUMBNAIL}${v.productThumbnail})`,
                  }}
                ></div>
                <div className="my-2 h-auto text-lg font-medium line-clamp-2">
                  {v.productName}
                </div>
                <div className="w-1/2 px-2 rounded bg-blue-900 text-white">
                  <div className=" ">{v.productType.typeName}</div>
                </div>
                <div className="h-auto my-auto text-red-500">
                  <span className="text-xs font-bold"> ฿</span>{" "}
                  <span className="text-lg font-bold">{v.productPrice}</span>
                </div>
                <div className="grid grid-cols-12 gap-2 ">
                  <button
                    className="border-1 rounded col-span-6 h-8 bg-blue-900 text-white"
                    onClick={() => {
                      authContext.addCart(v.productId);
                    }}
                  >
                    Add
                  </button>
                  <button
                    className="border border-blue-900 rounded bg-white col-span-6 h-8 text-blue-900"
                    onClick={() => {
                      authContext.addCart(v.productId);
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Index;
