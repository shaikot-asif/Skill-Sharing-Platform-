import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { images } from "../../../../constants/index.js";
import { AiOutlineClose, AiOutlineMenu, AiFillDashboard } from "react-icons/ai";
import { FaComments, FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import NavItem from "./NavItem.jsx";
import NavItemCollapse from "./NavItemCollapse.jsx";
import { useWindowSize } from "@uidotdev/usehooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { createePost } from "../../../../services/index/post.js";

const Header = () => {
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeNavName, setActiveNavName] = useState("dashboard");
  const windoSize = useWindowSize();
  const navigate = useNavigate();
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

  const { mutate: mutateCreatePost, isLoading: isLoadingCreatePost } =
    useMutation({
      mutationFn: ({ token }) => {
        return createePost({
          token,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["posts"]);
        toast.success("Post is created");
        navigate(`/admin/posts/manage/edit/${data?.slug}`);
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });
  const handleCreateNewPost = ({ token }) => {
    mutateCreatePost({ token });
  };

  return (
    <header className="flex h-fit w-full items-center justify-between p-4 lg:h-full lg:max-w-[300px] lg:flex-col lg:items-start lg:justify-start lg:p-0  bg-dark-hard border-b border-dark-soft">
      {/* logo */}
      <Link to={"/"}>
        <img src={images.Logo} alt="logo" className="w-24 lg:hidden" />
      </Link>

      <div className="cursor-pointer lg:hidden">
        {isMenuActive ? (
          <AiOutlineClose
            className="text-white w-6 h-6"
            onClick={toggleMenuHandler}
          />
        ) : (
          <AiOutlineMenu
            className="text-white w-6 h-6"
            onClick={toggleMenuHandler}
          />
        )}
      </div>

      {isMenuActive && (
        <div className="z-50 fixed inset-0 lg:static lg:h-full lg:w-full">
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
              <NavItem
                title="Dashboard"
                name="dashboard"
                icon={<AiFillDashboard className="text-xl" />}
                link="/admin"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />

              <NavItem
                title="Comments"
                name="comments"
                icon={<FaComments className="text-xl" />}
                link="/admin/comments"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />

              <NavItemCollapse
                title="Posts"
                icon={<MdDashboard className="text-xl" />}
                name="posts"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              >
                <Link to="/admin/posts/manage">Manage posts</Link>
                <button
                  disabled={isLoadingCreatePost}
                  onClick={() =>
                    handleCreateNewPost({ token: userState.userInfo.token })
                  }
                  className="text-start disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Add New Post
                </button>
              </NavItemCollapse>

              <NavItem
                title="User"
                name="user"
                icon={<FaUser className="text-xl" />}
                link="/admin/users/manage"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
