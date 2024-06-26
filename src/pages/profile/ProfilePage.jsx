import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import MainLayout from "../../components/MainLayout";
import { getUserProfile, updateProfile } from "../../services/index/users.js";
import ProfilePicture from "../../components/ProfilePicture";
import { userActions } from "../../store/reducers/userReducer.js";
import toast from "react-hot-toast";
import { useMemo } from "react";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const userState = useSelector((state) => state.user);

  const {
    data: profileData,
    isLoading: profileIsLoading,
    error: profileError,
  } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
  });

  const { mutate, isLoading: updateProfileIsLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return updateProfile({
        token: userState.userInfo.token,
        userData: { name, email, password },
        userId: userState.userInfo._id,
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Profile is updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (!userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    values: useMemo(() => {
      return {
        name: profileIsLoading ? "" : profileData.name,
        email: profileIsLoading ? "" : profileData.email,
      };
    }, [profileData?.email, profileData?.name]),
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };

  return (
    <MainLayout>
      <section className="container mx-auto py-10">
        <div className="w-full max-w-sm mx-auto">
          <ProfilePicture avatar={profileData?.avatar} />
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col mb-6 w-full">
              <label htmlFor="name" className="text-white font-semibold block">
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  minLength: {
                    value: 1,
                    message: "Name length must be at least 1 character",
                  },
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
                placeholder="Enter name"
                className={`bg-transparent placeholder:text-white text-white mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.name ? "border-red-500" : "border-white"
                }`}
              />

              {errors.name?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col mb-6 w-full">
              <label htmlFor="email" className="text-white font-semibold block">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Enter a valid email",
                  },
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                })}
                placeholder="Enter email"
                className={`bg-transparent placeholder:text-white text-white mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.email ? "border-red-500" : "border-white"
                }`}
              />

              {errors.email?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="password"
                className="text-white font-semibold block"
              >
                New Password (optional)
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                placeholder="Enter New password"
                className={`bg-transparent placeholder:text-white text-white mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border  ${
                  errors.password ? "border-red-500" : "border-white"
                }`}
              />
              {errors.password?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid || profileIsLoading}
              className="disabled:opacity-70 disabled:cursor-not-allowed bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6"
            >
              Update
            </button>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProfilePage;
