import React from "react";
import Header from "./component/header/Header.jsx";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../services/index/users.js";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

let fetchCount = true;
const AdminLayout = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  const {
    data: profileData,
    isLoading: profileIsLoading,
    refetch,
  } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState?.userInfo?.token });
    },
    queryKey: ["profile"],
  });

  useEffect(() => {
    if (fetchCount) {
      fetchCount = false;
      refetch();
    }
    if (!userState?.userInfo?.token) {
      navigate("/");
      return alert("Only Admin can access dashboard");
    }
  }, [profileData]);

  if (profileIsLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <h3 className="text-2xl text-slate-700">Loading...</h3>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-screen lg:flex-row">
      <Header />
      <main className="bg-[#F9F9F9] flex-1 p-4 lg:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
