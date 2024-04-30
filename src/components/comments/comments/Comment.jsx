import React from "react";
import { images, stables } from "../../../constants";
import { FiMessageSquare } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import CommentForm from "../CommentForm";
const Comment = ({
  comment,
  logginedUserId,
  setAffectedComment,
  affectedComment,
  addComment,
  parentId = null,
  updateComment,
  deleteComment,
  replies,
}) => {
  const isUserLoggined = Boolean(logginedUserId);
  const commentBelongsToUser = logginedUserId === comment.user._id;
  const isReplying =
    affectedComment &&
    affectedComment.type === "replying" &&
    affectedComment._id === comment._id;

  const isEditing =
    affectedComment &&
    affectedComment.type === "editing" &&
    affectedComment._id === comment._id;

  const repliedCommentId = parentId ? parentId : comment._id;

  const replyOnUserId = comment.user._id;

  return (
    <div className="flex flex-nowrap items-start gap-x-3 bg-dark-hard p-3 rounded-lg">
      <img
        className="w-9 h-9 object-cover rounded-full"
        src={comment?.user?.avatar? stables.UPLOAD_FOLDER_BASE_URL + comment.user.avatar : images.PostProfileImage}
        alt="user Profile"
      />
      <div className="flex-1 flex flex-col">
        <h5 className="lg:text-sm font-bold text-white text-xs">
          {comment.user.name}
        </h5>
        <span className="text-xs text-white">
          {new Date(comment.createdAt).toLocaleString()}
        </span>

        {!isEditing && (
          <p className="font-openSans mt-[10px] text-white">{comment.desc}</p>
        )}

        {isEditing && (
          <CommentForm
            btnLabel={"Update"}
            formSubmitHandler={(value) => updateComment(value, comment._id)}
            formCancelHandler={() => setAffectedComment(null)}
            initialText={comment.desc}
          />
        )}
        <div className="flex items-center gap-x-3 text-white font-roboto text-sm mt-3 mb-3">
          {isUserLoggined && (
            <button
              className="flex items-center space-x-2"
              onClick={() =>
                setAffectedComment({ type: "replying", _id: comment._id })
              }
            >
              <FiMessageSquare className="w-4 h-auto" />
              <span>Reply</span>
            </button>
          )}

          {commentBelongsToUser && (
            <>
              <button
                onClick={() =>
                  setAffectedComment({ type: "editing", _id: comment._id })
                }
                className="flex items-center space-x-2"
              >
                <CiEdit className="w-4 h-auto" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => deleteComment(comment._id)}
                className="flex items-center space-x-2"
              >
                <MdDeleteForever className="w-4 h-auto" />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
        {isReplying && (
          <CommentForm
            btnLabel="Reply"
            formSubmitHandler={(value) =>
              addComment(value, repliedCommentId, replyOnUserId)
            }
            formCancelHandler={() => setAffectedComment(null)}
          />
        )}

        {replies.length > 0 && (
          <div>
            {replies.map((reply) => (
              <Comment
                key={reply._id}
                addComment={addComment}
                comment={reply}
                logginedUserId={logginedUserId}
                setAffectedComment={setAffectedComment}
                affectedComment={affectedComment}
                deleteComment={deleteComment}
                replies={[]}
                updateComment={updateComment}
                parentId={comment._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
