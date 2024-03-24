import { React } from "react";
import { useState } from "react";
import { images } from "../constants";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";

const NavItemList = [
  { name: "Home", type: "link" },
  { name: "Articles", type: "link" },
  { name: "Pages", type: "dropdown", items: ["About Us", "Contact Us"] },
  { name: "Item", type: "link" },
  { name: "Faq", type: "link" },
];
const NavItem = ({ item }) => {
  const [dropdown, setDropdown] = useState(false);

  const toggleDropDown = () => {
    setDropdown(!dropdown);
  };
  return (
    <li className="relative group border-b text-white border-transparent transition-all duration-300 hover:border-b hover:border-b-blue-500 cursor-pointer">
      {item.type === "link" ? (
        <div>
          <a className="py-4 px-2" href="/">
            {item.name}
          </a>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <button
            className="py-4 px-2 flex gap-x-1 items-center"
            onClick={toggleDropDown}
          >
            <span>{item.name}</span>
            <RiArrowDropDownLine />
          </button>
          <div
            className={`${
              dropdown ? "block" : "hidden"
            } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
          >
            <ul className="bg-dark-hard flex flex-col shadow-lg shadow-dark-soft overflow-hidden">
              {item.items.map((name, index) => (
                <a
                  key={index}
                  className="px-4 py-2 border-b border-transparent transition-all duration-300 hover:border-b-primary"
                  href="/"
                >
                  {name}
                </a>
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
};
const Header = () => {
  const [navIsVisible, setNavIsVisible] = useState(false);

  const navVisibilityHandelar = () => {
    setNavIsVisible(!navIsVisible);
  };
  return (
    <div className="sticky top-0 left-0 right-0 z-50 bg-dark-hard border-b border-dark-soft">
      <header className="container mx-auto px-5 flex justify-between py-4 items-center">
        <div>
          <img className="w-24 z-auto" src={images.Logo} alt="logo" />
        </div>
        <div className="lg:hidden z-50">
          {navIsVisible ? (
            <IoIosClose
              className="w-6 h-6 text-white"
              onClick={navVisibilityHandelar}
            />
          ) : (
            <CiMenuBurger
              className="w-6 h-6 text-white"
              onClick={navVisibilityHandelar}
            />
          )}
        </div>
        <div
          className={`${
            navIsVisible ? "right-0" : " -right-full"
          } bg-dark-hard transition-all  duration-300 mt-[71px] lg:mt-0 lg:static z-40 flex-col lg:flex-row justify-center lg:justify-end w-full lg:w-auto fixed bottom-0 top-0 h-full  flex gap-x-9 items-center font-semibold`}
        >
          <ul className="flex flex-col lg:flex-row lg:gap-x-5 gap-y-5 font-semibold items-center">
            {NavItemList.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </ul>
          <button className="border-2 mt-5 lg:my-0 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300">
            Sign in
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
