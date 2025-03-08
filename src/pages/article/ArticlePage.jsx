import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../services/index/post";
import ArticleCardSkeleton from "../../components/ArticleCardSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import ArticleCard from "../../components/ArticleCard";
import { toast } from "react-hot-toast";
import MainLayout from "../../components/MainLayout";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
const ArticlePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchParamsValue = Object.fromEntries([...searchParams]);
  const searchKeyword = searchParamsValue?.search || "";

  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: () => getAllPosts(searchKeyword),
    queryKey: ["posts"],
    throwOnError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    refetch();
  }, [searchKeyword, refetch]);

  const handleSearch = ({ searchKeyword }) => {
    setSearchParams({ search: searchKeyword });
  };

  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10 flex flex-col">
        <Search
          className={"w-full max-w-xl mb-10"}
          onSearchKeyword={handleSearch}
        />
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
      </section>
    </MainLayout>
  );
};

export default ArticlePage;
