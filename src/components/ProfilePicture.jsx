import React from "react";
import { stables } from "../constants";
import { HiOutlineCamera } from "react-icons/hi";
const ProfilePicture = ({ avatar }) => {
  return (
    <div className="w-full flex items-center gap-x-4">
      <div className="relative w-20 h-20 rounded-full outline outline-offset-2 outline-1 outline-primary overflow-hidden">
        <label
          htmlFor="profilePicture"
          className="cursor-pointer absolute inset-0 rounded-full bg-transparent"
        >
          {avatar ? (
            <img
              src={stables.UPLOAD_FOLDER_BASE_URL + avatar}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full bg-blue-50/50 flex justify-center items-center">
              <HiOutlineCamera className="w-7 h-auto text-primary" />
            </div>
          )}
        </label>
        <input type="file" id="profilePicture" className="sr-only" />
      </div>
      <button
        type="button"
        className="text-white border border-red-500 rounded-lg px-4 py-2"
      >
        Delete
      </button>
    </div>
  );
};

export default ProfilePicture;
