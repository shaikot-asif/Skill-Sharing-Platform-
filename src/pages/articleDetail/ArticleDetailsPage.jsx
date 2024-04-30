import React, { useState, useEffect } from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import MainLayout from "../../components/MainLayout";
import { Link, useParams } from "react-router-dom";
import { images, stables } from "../../constants";
import SuggestPost from "./container/SuggestPost";
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
// const breadcrumbs = [
//   { name: "Home", link: "/" },
//   { name: "Blog", link: "/blog" },
//   { name: "Article title", link: "/blog/1" },
// ];
const postData = [
  {
    _id: "1",
    image: images.Post1,
    title: "Help children get better education",
    createdAt: "2024-01-28T15:35:53.607+0000",
  },
  {
    _id: "2",
    image: images.Post1,
    title: "Help children get better education",
    createdAt: "2024-01-28T15:35:53.607+0000",
  },
  {
    _id: "3",
    image: images.Post1,
    title: "Help children get better education",
    createdAt: new Date(),
  },
  {
    _id: "4",
    image: images.Post1,
    title: "Help children get better education",
    createdAt: new Date(),
  },
];
const tagsData = ["JavaScipt", "React.js", "Node js", "Web Development"];

const ArticleDetailsPage = () => {
  const { slug } = useParams();

  const [breadcrumbs, setBreadCrumbs] = useState([]);
  const [body, setBody] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryFn:async () => await getSinglePosts({ slug }),

    queryKey: ["blog", slug],

    
  });
  let json
  if (data === undefined) {
    json = {
      "type": "doc",
      "content": [
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "Wow, this editor instance exports its content as JSON"
            }
          ]
        },
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "marks": [
                {
                  "type": "bold"
                },
                {
                  "type": "italic"
                }
              ],
              "text": "this is a bold text"
            }
          ]
        }
      ]
    }
  }else{
    json = data.body
  }


  useEffect(() => {
    setBreadCrumbs([
      { name: "Home", link: "/" },
      { name: "Blog", link: "/blog" },
      { name: "Article title", link: `/blog/${data?.slug}` },
    ]);
    setBody(parse(generateHTML(json,[Bold,Paragraph,Document,Italic,Text])))
  }, [data]);

  console.log(json, "detail data");

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
            <div className="mt-4 flex gap-2">
              {data?.categories.map((category) => (
                <Link
                  to={`/blog?category=${category.name}`}
                  className="md:text-base text-primary text-sm font-roboto inline-block"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <h1 className="md:text-[26px] text-xl font-medium font-roboto mt-4 text text-white">
              {data?.title}
            </h1>
            <div className="mt-4 text-white">{body}</div>
            <CommentContainer className="mt-10" logginedUserId="a" />
          </article>

          <div>
            <SuggestPost
              className="mt-8 lg:mt-0 lg:max-w-xs"
              header="Latest Article"
              posts={postData}
              tags={tagsData}
            />

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
