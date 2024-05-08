import React from "react";
import { useDataTable } from "../../../../hooks/useDataTable";
import {
  deleteComment,
  getAllComments,
  updateComment,
} from "../../../../services/index/comments";
import DataTable from "../../component/DataTable";
import { stables, images } from "../../../../constants";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Comments = () => {
  const {
    userState,
    currentPage,
    searchKeyword,
    data: commentData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () => getAllComments(userState.userInfo.token, searchKeyword),
    dataQueryKey: "comments",
    deleteDataMessage: "Comment is deleted",
    mutateDeleteFn: ({ slug, token }) => {
      return deleteComment({
        commentId: slug,
        token,
      });
    },
  });

  const {
    mutate: mutateUpdateCommentCheck,
    isLoading: mutateUpdateCommentCheckLoading,
  } = useMutation({
    mutationFn: ({ token, check, commentId }) => {
      return updateComment({ token, check, commentId });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["comments"]);
      toast.error(error.message);
    },
  });

  return (
    <DataTable
      pageTitle={"Manage Comments"}
      dataListName="Comments"
      searchInputPlaceholder={"Search Comments..."}
      searchKeywordOrSubmitHandler={submitSearchKeywordHandler}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={[
        "Author",
        "Comment",
        "In Respond To",
        "Created At",
        "",
      ]}
      isFetching={isFetching}
      isLoading={isLoading}
      data={commentData?.data}
    >
      {commentData?.data.map((comment, index) => (
        <tr key={index}>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/" className="relative block">
                  <img
                    alt={comment?.user?.name}
                    src={
                      comment?.user?.avatar
                        ? stables.UPLOAD_FOLDER_BASE_URL + comment?.user?.avatar
                        : images.PostProfileImage
                    }
                    className="mx-auto object-cover rounded-sm aspect-square w-10 "
                  />
                </a>
              </div>
              <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap">
                  {comment?.user?.name}
                </p>
              </div>
            </div>
          </td>

          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            {comment?.replyOnUser !== null && (
              <p className="text-gray-900 whitespace-no-wrap">
                In reply to{" "}
                <Link
                  className="text-blue-500"
                  to={`/blog/${comment?.post?.slug}/#comment-${comment?._id}`}
                >
                  {comment?.replyOnUser?.name}
                </Link>
              </p>
            )}
            <p className="text-gray-900 whitespace-no-wrap">{comment?.desc}</p>
          </td>

          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              <Link
                className="text-blue-500"
                to={`/blog/${comment?.post?.slug}`}
              >
                {comment?.post?.title}
              </Link>
            </p>
          </td>

          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              {new Date(comment.createdAt).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
            <button
              onClick={() =>
                mutateUpdateCommentCheck({
                  token: userState.userInfo.token,
                  check: comment?.check ? false : true,
                  commentId: comment._id,
                })
              }
              type="button"
              disabled={isLoadingDeleteData}
              className={`${
                comment?.check
                  ? "text-yellow-600 hover:text-yellow-900"
                  : "text-green-600 hover:text-green-900"
              } disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {comment?.check ? "Unapprove" : "Approve"}
            </button>

            <button
              onClick={() =>
                deleteDataHandler({
                  slug: comment?._id,
                  token: userState.userInfo.token,
                })
              }
              type="button"
              disabled={isLoadingDeleteData}
              className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Delete
            </button>
          </td>

          {/* <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div className="flex gap-x-2">
              {post.tags.length > 0
                ? post.tags.map((tag, index) => (
                    <p>
                      {tag}
                      {post.tags.length - 1 !== index && ","}
                    </p>
                  ))
                : "No Tags"}
            </div>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
            <button
              onClick={() =>
                deleteDataHandler({
                  slug: post?.slug,
                  token: userState.userInfo.token,
                })
              }
              type="button"
              disabled={isLoadingDeleteData}
              className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Delete
            </button>
            <Link
              to={`/admin/posts/manage/edit/${post?.slug}`}
              className="text-green-600 hover:text-green-900"
            >
              Edit
            </Link>
          </td> */}
        </tr>
      ))}
    </DataTable>
  );
};

export default Comments;
