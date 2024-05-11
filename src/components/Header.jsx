import { React } from "react";
import { useState } from "react";
import { images } from "../constants";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/actions/user.js";
import { Link } from "react-router-dom";

const NavItemList = [
  { name: "Home", type: "link", href: "/" },
  { name: "Articles", type: "link", href: "/articles" },

  { name: "Message", type: "msgLink", href: "/messages" },
];
const NavItem = ({ item, userState }) => {
  return (
    <li className="relative group border-b text-white border-transparent transition-all duration-300 hover:border-b hover:border-b-blue-500 cursor-pointer">
      {item.type === "link" ? (
        <div>
          <Link className="py-4 px-2" to={item.href}>
            {item.name}
          </Link>
        </div>
      ) : (
        item.type === "msgLink" &&
        userState?.userInfo?.token && (
          <div>
            <Link className="py-4 px-2" to={item.href}>
              {item.name}
            </Link>
          </div>
        )
      )}
    </li>
  );
};
const Header = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const [navIsVisible, setNavIsVisible] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const dispatch = useDispatch();

  const navVisibilityHandelar = () => {
    setNavIsVisible(!navIsVisible);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div className="sticky top-0 left-0 right-0 z-50 bg-dark-hard border-b border-dark-soft">
      <header className="container mx-auto px-5 flex justify-between py-4 items-center">
        <Link to="/">
          <img className="w-24 z-auto" src={images.Logo} alt="logo" />
        </Link>
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
              <NavItem key={item.name} userState={userState} item={item} />
            ))}
          </ul>

          {userState.userInfo ? (
            <div className="flex flex-col lg:flex-row lg:gap-x-5 gap-y-5 font-semibold items-center">
              <div className="relative group">
                <div className="flex flex-col items-center">
                  <button
                    className=" flex gap-x-1 items-center  border-2 mt-5 lg:my-0 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
                    onClick={() => setProfileDropdown(!profileDropdown)}
                  >
                    <span>Account</span>
                    <RiArrowDropDownLine />
                  </button>
                  <div
                    className={`${
                      profileDropdown ? "block" : "hidden"
                    } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
                  >
                    <ul className="bg-dark-hard flex flex-col shadow-lg shadow-dark-soft overflow-hidden">
                      {userState.userInfo.admin && (
                        <button
                          className="text-white px-4 py-2 border-b border-transparent transition-all duration-300 hover:border-b-primary"
                          type="button"
                          onClick={() => navigate("/admin")}
                        >
                          Admin Dashboard
                        </button>
                      )}

                      <button
                        className="text-white px-4 py-2 border-b border-transparent transition-all duration-300 hover:border-b-primary"
                        type="button"
                        onClick={() => navigate("/profile")}
                      >
                        Profile
                      </button>
                      <button
                        className="text-white px-4 py-2 border-b border-transparent transition-all duration-300 hover:border-b-primary"
                        type="button"
                        onClick={logoutHandler}
                      >
                        Logout
                      </button>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="border-2 mt-5 lg:my-0 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              Sign in
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
