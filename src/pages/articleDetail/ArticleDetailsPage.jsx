import React from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import MainLayout from "../../components/MainLayout";
import { Link } from "react-router-dom";
import { images } from "../../constants";
import SuggestPost from "./container/SuggestPost";
import CommentContainer from "../../components/comments/comments/CommentContainer";
import SocialShareButtons from "../../components/comments/SocialShareButtons";

const bradcrumbs = [
  { name: "Home", link: "/" },
  { name: "Blog", link: "/blog" },
  { name: "Article title", link: "/blog/1" },
];
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
  return (
    <MainLayout>
      <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
        <article className="flex-1">
          <BreadCrumbs data={bradcrumbs} />
          <img
            src={images.Post1}
            alt="post1 image"
            className="rounded-3xl w-full"
          />
          <Link
            to="/blog?category=selectedCategory"
            className="md:text-base text-primary text-sm font-roboto inline-block mt-4"
          >
            Education
          </Link>
          <h1 className="md:text-[26px] text-xl font-medium font-roboto mt-4 text text-white">
            Lorem ipsum dolor sit amet.
          </h1>
          <div className="mt-4 text-white">
            <p className="leading-7">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
              reiciendis vel debitis hic voluptate accusantium deleniti corporis
              laborum voluptas ut. Blanditiis, natus. Quaerat similique corrupti
              nesciunt at voluptates distinctio, architecto quam non esse
              dignissimos odio fugiat nisi laudantium numquam excepturi facere.
              Aliquid, quas praesentium. Eos officia libero voluptate similique
              repudiandae! Lorem, ipsum dolor sit amet consectetur adipisicing
              elit. Eaque assumenda corrupti et? Exercitationem impedit
              reiciendis tempora sint asperiores praesentium, dolorum unde odit
              corporis eum iure illo modi libero expedita doloremque qui
              cupiditate tenetur aliquid sapiente animi omnis! Impedit iste
              cumque quia obcaecati voluptatum nostrum, repellat nisi, aut
              laborum dolorem laudantium!
            </p>
          </div>
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
    </MainLayout>
  );
};

export default ArticleDetailsPage;
