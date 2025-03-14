import React, { useState, useEffect } from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import MainLayout from "../../components/MainLayout";
import { Link, useParams } from "react-router-dom";
import { images, stables } from "../../constants";
import CommentContainer from "../../components/comments/comments/CommentContainer";
import SocialShareButtons from "../../components/comments/SocialShareButtons";
import { useQuery } from "@tanstack/react-query";
import { getSinglePosts } from "../../services/index/post";
import { generateHTML } from "@tiptap/html";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";
import parse from "html-react-parser";
import ArticleDetailSkeleton from "./components/ArticleDetailSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import { useSelector } from "react-redux";
import Editor from "../../components/editor/Editor";

const ArticleDetailsPage = () => {
  const { slug } = useParams();

  const userState = useSelector((state) => state.user);

  const [breadcrumbs, setBreadCrumbs] = useState([]);
  const [body, setBody] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getSinglePosts({ slug }),

    queryKey: ["blog", slug],
  });
  let json;
  if (data === undefined) {
    json = {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "content as JSON this is try",
            },
          ],
        },
      ],
    };
  } else {
    json = data.body;
  }

  console.log(data?.body);

  useEffect(() => {
    setBreadCrumbs([
      { name: "Home", link: "/" },
      { name: "Articles", link: "/articles" },
      { name: `${data?.title}`, link: `/blog/${data?.slug}` },
    ]);
    setBody(
      parse(generateHTML(json, [Bold, Paragraph, Document, Italic, Text]))
    );
  }, [json]);

  return (
    <MainLayout>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message={"Couldn't found post detail"} />
      ) : (
        <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1">
            <BreadCrumbs data={breadcrumbs} />
            <img
              src={
                data?.photo
                  ? stables.UPLOAD_FOLDER_BASE_URL + data?.photo
                  : images.Post1
              }
              alt={data?.title}
              className="rounded-3xl w-full"
            />
            {/* <div className="mt-4 flex gap-2">
              {data?.categories.map((category) => (
                <Link
                  to={`/blog?category=${category.name}`}
                  className="md:text-base text-primary text-sm font-roboto inline-block"
                >
                  {category.name}
                </Link>
              ))}
            </div> */}
            <h1 className="md:text-[26px] text-xl font-medium font-roboto mt-4 text text-white">
              {data?.title}
            </h1>
            <div className="w-full text-white">
              {!isLoading && !isError && (
                <Editor content={data?.body} editable={false} />
              )}
            </div>
            <CommentContainer
              comments={data?.comments}
              className="mt-10"
              logginedUserId={userState?.userInfo?._id}
              postSlug={slug}
            />
          </article>

          <div>
            <h2 className="text-white font-roboto font-medium mt-8 md:text-xl">
              Tags
            </h2>
            <div className="flex flex-wrap gap-x-2 gap-y-2 mt-4">
              {data?.tags.map((item, index) => (
                <Link
                  key={index}
                  to="/"
                  className="inline-block rounded-md px-3 py-1.5 bg-primary font-roboto text-xs text-white md:text-sm"
                >
                  {item}
                </Link>
              ))}
            </div>

            <div className="mt-7">
              <h2 className="font-roboto font-medium text-white mb-4 md:text-xl">
                Share on:
              </h2>
              <SocialShareButtons url={encodeURI("https://stacklearner.com")} />
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
};

export default ArticleDetailsPage;
