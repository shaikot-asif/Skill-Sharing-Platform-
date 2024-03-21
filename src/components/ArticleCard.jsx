import React from "react";
import images from "../constants/images";
import { FaCheck } from "react-icons/fa";

const ArticleCard = ({ className }) => {
  return (
    <div
      className={`rounded-3xl overflow-hidden bg-dark-soft shadow-[0_3px_10px_#f7fafc)] ${className}`}
    >
      <img
        src={images.Post1}
        alt="post Image"
        className="lg:h-48 xl:h-60 w-full object-cover object-center h-auto h-52"
      />
      <div className="text-white p-5">
        <h2 className="lg:text-[28px] font-roboto font-bold text-xl md:text-2xl">
          Lorem ipsum dolor sit.
        </h2>
        <p className="mt-3 text-white text-sm md:text-lg">
          Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
          consectetur adipisicing elit
        </p>
        <div className="flex justify-between flex-nowrap items-center mt-6">
          <div className="flex items-center gap-x-2 md:gap-x-2.5">
            <img
              src={images.PostProfileImage}
              alt="userprofileimage"
              className="w-9 h-9 md:w-10 md:h-10"
            />
            <div className="flex flex-col">
              <h4 className="font-bold italic text-sm md:text-base">
                Asif Ahmed
              </h4>
              <div className="flex items-center gap-x-2">
                <span className="bg-[#36B37E] w-fit bg-opacity-20 p-1.5 rounded-full">
                  <FaCheck className="w-1.5 h-1.5 text-[#36B37E]" />
                </span>
                <span className="italic text-xs">Verified Writer</span>
              </div>
            </div>
          </div>
          <span className="font-bold italic text-sm">02 May</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
