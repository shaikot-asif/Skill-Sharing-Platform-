import React from "react";
import { FaSearch } from "react-icons/fa";
import { images } from "../../../constants";

const Hero = () => {
  return (
    <section className="text-white container mx-auto flex flex-col px-5 lg:flex-row">
      <div className="mt-10 lg:w-1/2">
        <h1 className="font-roboto text-3xl text-center font-bold md:text-5xl lg:text-4xl xl:text-5xl lg:text-left lg:max-w-[540px]">
          Lorem ipsum dolor sit amet consectetur
        </h1>
        <p className="mt-4 text-center lg:text-base xl:text-xl md:text-xl lg:text-left">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores,
          dolorem incidunt cum cumque ducimus sit!
        </p>
        <div className="flex flex-col gap-y-2.5 mt-10 lg:mt-6 xl:mt-10 relative">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959EAD]" />
            <input
              className="shadow-slate-200 md:py-4 placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#959EAD] rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none"
              placeholder="Search Article"
              type="text"
            />
          </div>
          <button className="w-full bg-primary text-white font-semibold rounded-lg px-5 py-3 md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 md:w-fit md:py-2">
            Search
          </button>
        </div>
        <div className="lg:items-start flex mt-4 flex-col lg:flex-row lg:flex-nowrap lg:gap-x-4 lg:mt-7">
          <span className="lg:mt-4 font-semibold mt-2 italic lg:text-sm xl:text-base">
            Popular Tags:
          </span>
          <ul className=" flex flex-wrap gap-x-2.5 gap-y-2.5 mt-3">
            <li className=" rounded-lg bg-dark-soft px-3 py-1.5 font-semibold">
              Design
            </li>
            <li className=" rounded-lg bg-dark-soft px-3 py-1.5 font-semibold">
              User Experience
            </li>
            <li className=" rounded-lg bg-dark-soft px-3 py-1.5 font-semibold">
              Design
            </li>
          </ul>
        </div>
      </div>
      <div className="hidden lg:block lg:1/2">
        <img className="w-full" src={images.HeroImage} alt="Reading article" />
      </div>
    </section>
  );
};

export default Hero;
