import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { images } from "../../../../constants/index.js";
import { AiOutlineClose, AiOutlineMenu, AiFillDashboard } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import NavItem from "./NavItem.jsx";
import NavItemCollapse from "./NavItemCollapse.jsx";
import { useWindowSize } from "@uidotdev/usehooks";
const MENU_ITEMS = [
  {
    title: "Dashboard",
    link: "/admin",
    icon: <AiFillDashboard className="text-xl" />,
    name: "dashboard",
    type: "link",
  },
  {
    title: "Comments",
    link: "/admin/comments",
    icon: <FaComments className="text-xl" />,
    name: "comments",
    type: "link",
  },
  {
    title: "Posts",
    content: [
      { title: "New", link: "/admin/posts/new" },
      { title: "Manage", link: "/admin/posts/manage" },
    ],
    icon: <MdDashboard className="text-xl" />,
    name: "posts",
    type: "collapse",
  },
];

const Header = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeNavName, setActiveNavName] = useState("dashboard");
  const windoSize = useWindowSize();
  const toggleMenuHandler = () => {
    setIsMenuActive(!isMenuActive);
  };

  useEffect(() => {
    if (windoSize.width < 1024) {
      setIsMenuActive(false);
    } else {
      setIsMenuActive(true);
    }
  }, [windoSize.width]);
  return (
    <header className="flex h-fit w-full items-center justify-between p-4 lg:h-full lg:max-w-[300px] lg:flex-col lg:items-start lg:justify-start lg:p-0  bg-dark-hard border-b border-dark-soft">
      {/* logo */}
      <Link to={"/"}>
        <img src={images.Logo} alt="logo" className="w-24 lg:hidden" />
      </Link>

      <div className="cursor-pointer lg:hidden">
        {isMenuActive ? (
          <AiOutlineClose className="w-6 h-6" onClick={toggleMenuHandler} />
        ) : (
          <AiOutlineMenu className="w-6 h-6" onClick={toggleMenuHandler} />
        )}
      </div>

      {isMenuActive && (
        <div className="fixed inset-0 lg:static lg:h-full lg:w-full">
          <div
            className="fixed inset-0 bg-black opacity-50 lg:hidden"
            onClick={toggleMenuHandler}
          ></div>

          <div className="fixed top-0 bottom-0 left-0 z-50 w-3/4 overflow-y-auto bg-dark-hard border-b border-dark-soft p-4 lg:static lg:h-full lg:w-full lg:p-6">
            <Link to={"/"}>
              <img src={images.Logo} alt="logo" className="w-24" />
            </Link>

            <h4 className="mt-10 font-bold text-primary">MAIN MENU</h4>
            <div className="mt-6 flex-col gap-y-[0.563rem]">
              {MENU_ITEMS.map((item) =>
                item.type === "link" ? (
                  <NavItem
                    title={item.title}
                    name={item.name}
                    icon={item.icon}
                    link={item.link}
                    activeNavName={activeNavName}
                    setActiveNavName={setActiveNavName}
                    key={item.name}
                  />
                ) : (
                  <NavItemCollapse
                    title={item.title}
                    name={item.name}
                    icon={item.icon}
                    content={item.content}
                    activeNavName={activeNavName}
                    setActiveNavName={setActiveNavName}
                    key={item.name}
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
