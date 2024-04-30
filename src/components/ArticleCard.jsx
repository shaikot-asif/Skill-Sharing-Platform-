import React from "react";
import images from "../constants/images";
import { FaCheck } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import stables from "../constants/stable";
import { Link } from "react-router-dom";

const ArticleCard = ({ className, post }) => {
  console.log(post);
  return (
    <div
      className={`rounded-3xl overflow-hidden bg-dark-soft shadow-[0_3px_10px_#f7fafc)] ${className}`}
    >
      <Link to={`/blog/${post.slug}`}>
        <img
          src={
            post.photo
              ? stables.UPLOAD_FOLDER_BASE_URL + post.photo
              : images.Post1
          }
          alt="post Image"
          className="lg:h-48 xl:h-60 w-full object-cover object-center h-auto h-52"
        />
      </Link>

      <div className="text-white p-5">
        <Link to={`/blog/${post.slug}`}>
          <h2 className="lg:text-[28px] font-roboto font-bold text-xl md:text-2xl">
            {post.title}
          </h2>
        </Link>
        <p className="mt-3 text-white text-sm md:text-lg">{post.caption}</p>
        <div className="flex justify-between flex-nowrap items-center mt-6">
          <div className="flex items-center gap-x-2 md:gap-x-2.5">
            <img
              src={
                post.user.avatar
                  ? stables.UPLOAD_FOLDER_BASE_URL + post.user.avatar
                  : images.PostProfileImage
              }
              alt="userprofileimage"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full"
            />
            <div className="flex flex-col">
              <h4 className="font-bold italic text-sm md:text-base">
                {post.user.name}
              </h4>
              <div className="flex items-center gap-x-2">
                <span
                  className={`${
                    post.user.verified ? "bg-[#36B37E]" : "bg-red-500"
                  } w-fit bg-opacity-20 p-1.5 rounded-full`}
                >
                  {post.user.verified ? (
                    <FaCheck className="w-1.5 h-1.5 text-[#36B37E]" />
                  ) : (
                    <IoIosClose className="w-1.5 h-1.5 text-red-500" />
                  )}
                </span>
                <span className="italic text-xs">
                  {post.user.verified ? "Verified " : "Unverified"} Writer
                </span>
              </div>
            </div>
          </div>
          <span className="font-bold italic text-sm">
            {new Date(post.createdAt).getDate()}{" "}
            {new Date(post.createdAt).toLocaleString("default", {
              month: "long",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
