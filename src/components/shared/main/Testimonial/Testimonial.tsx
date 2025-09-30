"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/pagination";

import "swiper/css";
import "swiper/css/navigation";
import "./testimonial.css";
import Image from "next/image";

type TestimonialData = {
  image: { src: string };
  quote: string;
  name: string;
  title: string;
  details: string;
};

type TestimonialProps = {
  testimonials: TestimonialData[];
};

// Component now receives testimonials as a prop
const Testimonial = ({ testimonials }: TestimonialProps) => {
  return (
    <div className="testimonial-container">
      <Swiper modules={[Navigation]} spaceBetween={50} slidesPerView={1} navigation loop={true} pagination={{ clickable: true }} className="mySwiper">
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="testimonial-slide-content">
              <div className="flex md:flex-row flex-col gap-5 items-center justify-center">
                <div className="testimonial-image-wrapper md:mr-10">
                  {/* <img src={testimonial.image.src} alt={testimonial.name} className="testimonial-image" /> */}
                  <Image src={testimonial.image.src} alt="image" className="testimonial-image" width={300} height={300} />
                </div>
                <div className="testimonial-text-content">
                  <p className="testimonial-quote">{testimonial.quote}</p>
                  <h4 className="testimonial-name">{testimonial.name}</h4>
                  <p className="testimonial-title">{testimonial.title}</p>
                  <p className="testimonial-details">{testimonial.details}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
