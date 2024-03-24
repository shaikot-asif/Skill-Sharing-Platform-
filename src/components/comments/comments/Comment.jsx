import React from "react";
import { images } from "../../../constants";
import { FiMessageSquare } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
const Comment = ({ Comment }) => {
  return (
    <div className="flex flex-nowrap items-start gap-x-3 bg-dark-hard p-3 rounded-lg">
      <img
        className="w-9 h-9 object-cover rounded-full"
        src={images.PostProfileImage}
        alt="user Profile"
      />
      <div className="flex-1 flex flex-col">
        <h5 className="font-bold text-white text-xs">{Comment.user.name}</h5>
        <span className="text-xs text-white">
          {new Date(Comment.createdAt).toLocaleString()}
        </span>

        <p className="font-openSans mt-[10px] text-white">{Comment.desc}</p>
        <div className="flex items-center gap-x-3 text-white font-roboto text-sm mt-3 mb-3">
          <button className="flex items-center space-x-2">
            <FiMessageSquare className="w-4 h-auto" />
            <span>Reply</span>
          </button>
          <button className="flex items-center space-x-2">
            <CiEdit className="w-4 h-auto" />
            <span>Edit</span>
          </button>
          <button className="flex items-center space-x-2">
            <MdDeleteForever className="w-4 h-auto" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
