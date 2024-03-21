import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { images } from "../constants";

const Footer = () => {
  return (
    <div>
      <footer className="container mx-auto grid grid-cols-10 px-5 py-10 gap-y-10 gap-x-5 md:pt-20 md:grid-cols-12 lg:grid-cols-10 lg:gap-x-10">
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="text-dark-lite font-bold">Product</h3>
          <ul className="text-dark-lite text-sm mt-5 space-y-4">
            <li>
              <a href="/">LandingPage</a>
            </li>
            <li>
              <a href="/">Feature</a>
            </li>
            <li>
              <a href="/">Documentation</a>
            </li>
            <li>
              <a href="/">Pricing</a>
            </li>
            <li>
              <a href="/">LandingPage</a>
            </li>
          </ul>
        </div>

        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="text-dark-lite font-bold">Product</h3>
          <ul className="text-dark-lite text-sm mt-5 space-y-4">
            <li>
              <a href="/">LandingPage</a>
            </li>
            <li>
              <a href="/">Feature</a>
            </li>
            <li>
              <a href="/">Documentation</a>
            </li>
            <li>
              <a href="/">Pricing</a>
            </li>
            <li>
              <a href="/">LandingPage</a>
            </li>
          </ul>
        </div>

        <div className="col-span-5 md:col-span-4 md:col-start-5 lg:col-span-2 lg:col-start-auto">
          <h3 className="text-dark-lite font-bold">Product</h3>
          <ul className="text-dark-lite text-sm mt-5 space-y-4">
            <li>
              <a href="/">LandingPage</a>
            </li>
            <li>
              <a href="/">Feature</a>
            </li>
            <li>
              <a href="/">Documentation</a>
            </li>
            <li>
              <a href="/">Pricing</a>
            </li>
            <li>
              <a href="/">LandingPage</a>
            </li>
          </ul>
        </div>

        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="text-dark-lite font-bold">Product</h3>
          <ul className="text-dark-lite text-sm mt-5 space-y-4">
            <li>
              <a href="/">LandingPage</a>
            </li>
            <li>
              <a href="/">Feature</a>
            </li>
            <li>
              <a href="/">Documentation</a>
            </li>
            <li>
              <a href="/">Pricing</a>
            </li>
            <li>
              <a href="/">LandingPage</a>
            </li>
          </ul>
        </div>

        <div className="col-span-10 md:order-first md:col-span-4 lg:col-span-2">
          <img src={images.Logo} alt="Logo" className="w-24 m-auto md:mx-0" />
          <p className="lg:text-sm text-sm text-dark-lite text-center mt-4 md:text-left md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
          <ul className="flex justify-center items-center mt-5 space-x-4 text-gray-300 md:justify-start">
            <li>
              <a href="/">
                <FaFacebook className="w-6 h-auto" />
              </a>
            </li>

            <li>
              <a href="/">
                <FaTwitter className="w-6 h-auto" />
              </a>
            </li>

            <li>
              <a href="/">
                <FaLinkedin className="w-6 h-auto" />
              </a>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex flex-col items-center space-y-4 md:col-span-12 lg:col-span-10">
          <div>
            <img src={images.Logo} alt="logo" className="w-24" />
          </div>
          <p className="text-dark-lite">Copyright © 2024. BUBT</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
