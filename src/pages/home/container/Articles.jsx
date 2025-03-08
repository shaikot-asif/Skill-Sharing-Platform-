import React from "react";
import ArticleCard from "../../../components/ArticleCard";
import { FaArrowRight } from "react-icons/fa";
import { getAllPosts } from "../../../services/index/post.js";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import ArticleCardSkeleton from "../../../components/ArticleCardSkeleton";
import ErrorMessage from "../../../components/ErrorMessage";
import { Link } from "react-router-dom";

const Articles = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAllPosts("", 1, 6),
    queryKey: ["posts"],
    throwOnError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return (
    <section className="container mx-auto px-5 py-10 flex flex-col">
      <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
        {isLoading ? (
          [...Array(3)].map((item, index) => (
            <ArticleCardSkeleton
              key={index}
              className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-20px)]"
            />
          ))
        ) : isError ? (
          <ErrorMessage message={"Couldn't found data"} />
        ) : (
          data?.data.map((post, index) => (
            <ArticleCard
              key={post._id}
              post={post}
              className={
                "w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-20px)]"
              }
            />
          ))
        )}
      </div>
      <Link
        to={"/articles"}
        className="mx-auto flex items-center gap-x-2 font-bold text-primary border-2 border-primary px-6 py-3 rounded-lg"
      >
        <span>More article</span>
        <FaArrowRight />
      </Link>
    </section>
  );
};

export default Articles;
