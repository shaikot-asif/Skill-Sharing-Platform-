import React from "react";
import CommentForm from "../CommentForm";
import { getCommentsData } from "../../../data/comments";
import { useState } from "react";
import { useEffect } from "react";
import Comment from "./Comment";

const CommentContainer = ({ className }) => {
  const [comments, setComments] = useState([]);
  const mainComments = comments.filter((comment) => comment.parent === null);
  console.log(comments);

  useEffect(() => {
    (async () => {
      const commentData = await getCommentsData();
      setComments(commentData);
    })();
  }, []);
  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    const newComment = {
      _id: "10",
      user: {
        _id: "a",
        name: "Mohammad Rezaii",
      },
      desc: value,
      post: "1",
      parent: parent,
      replyOnUser: replyOnUser,
      createdAt: "2022-12-31T17:22:05.092+0000",
    };
    setComments((curState) => {
      return [newComment, ...curState];
    });
  };
  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel={"send"}
        formSubmitHandler={(value) => addCommentHandler(value)}
      />
      <div className="space-y-4 mt-8">
        {mainComments.map((comment) => (
          <Comment Comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentContainer;
