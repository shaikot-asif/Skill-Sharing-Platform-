import React from "react";
import { FaSearch } from "react-icons/fa";
import Search from "../../../components/Search";
import { images } from "../../../constants";

const Hero = () => {
  return (
    <section className="text-white container mx-auto flex flex-col px-5 lg:flex-row">
      <div className="mt-10 lg:w-1/2">
        <h1 className="font-roboto text-3xl text-center font-bold md:text-5xl lg:text-4xl xl:text-5xl lg:text-left lg:max-w-[540px]">
          Unlock Your Potential. Share Your Skills. Learn from Others.
        </h1>
        <p className="mt-4 text-center lg:text-base xl:text-xl md:text-xl lg:text-left">
          Welcome to Skill Sharing Platform – your go-to destination for
          exchanging knowledge, mastering new skills, and connecting with a
          community of passionate learners and experts. Whether you're here to
          teach, learn, or both, this is the place where skills meet
          opportunity.
        </p>
        {/* <Search className={"lg:mt-6 xl:mt-10"} /> */}
      </div>
      <div className="hidden lg:block lg:1/2">
        <img className="w-full" src={images.HeroImage} alt="Reading article" />
      </div>
    </section>
  );
};

export default Hero;
