import React from "react";

import { images } from "../../../constants";

const CTA = () => {
  return (
    <section className="relative px-5 text-white">
      <div className="lg:place-items-center  container grid grid-cols-12 mx-auto py-10 md:pb-10">
        <div className="col-span-12 lg:col-span-6">
          <h2 className="lg:text-left font-roboto font-bold text-2xl md:text-4xl md:text-center md:leading-normal">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </h2>
          <div className="lg:mx-0  w-full max-w-[494px] mt-12 space-y-3 mx-auto md:space-y-0 md:flex md:items-center md:space-x-2">
            <input
              type="text"
              className="focus:outline-none px-4 py-3 rounded-lg w-full placeholder:text-dark-soft text-dark-soft"
              placeholder="Your Email"
            />
            <button className=" px-4 py-3 rounded-lg w-full bg-primary font-bold md:w-fit md:whitespace-nowrap">
              Get Started
            </button>
          </div>
          <p className="text-sm leading-7 mt-6 lg:text-left">
            <span className="italic font-bold text-dark-soft">
              Lorem ipsum dolor sit
            </span>
            , amet consectetur adipisicing elit. Iure architecto, magnam
            inventore sint aspernatur laboriosam.
          </p>
        </div>

        <div className="col-span-12 hidden mb-[70px] md:block lg:col-span-6">
          <div className="w-3/4 mx-auto relative">
            <div className="w-full bg-dark-soft rounded-xl p-3 z-[1] relative">
              <img
                src={images.CtaImage}
                alt="post Image"
                className="lg:h-48 xl:h-60 w-full object-cover object-center h-auto"
              />
              <div className="text-white p-5">
                <h2 className="lg:text-[28px] font-roboto font-bold text-xl md:text-2xl">
                  Lorem ipsum dolor sit.
                </h2>
                <p className="mt-3 text-white text-sm md:text-lg">
                  Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit
                  amet consectetur adipisicing elit
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
