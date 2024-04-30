import React from "react";
import CommentForm from "../CommentForm";
import { useState } from "react";
import Comment from "./Comment";
import {useMutation} from '@tanstack/react-query'
import { createNewComment } from "../../../services/index/comments";
import {useSelector}from 'react-redux'
import toast from "react-hot-toast";


const CommentContainer = ({ className, logginedUserId,comments,postSlug }) => {

  const [affectedComment, setAffectedComment] = useState(null);
  const userState = useSelector((state) => state.user);

  const {mutate:mutateNewComment,isPending:isLoadingNewComment} = useMutation({
    mutationFn:({token,
      desc,
      slug,
      parent,
      replyOnUser,})=>{
      return createNewComment({token,
        desc,
        slug,
        parent,
        replyOnUser,})
    },
    onSuccess:()=>{
      toast.success("Your comment is send successfully, it will be visible after the confirmation of the admin")
    },
    onError:(error)=>{
      toast.error(error.message);
      console.log(error);
    }

  })


  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
   mutateNewComment({
    desc:value,
    parent,
    replyOnUser,
    token:userState.userInfo.token,
    slug:postSlug

   })
    setAffectedComment(null);
  };

  const updateCommentHandler = (value, commentId) => {

    setAffectedComment(null);
  };

  const deleteCommentHandler = (commentId) => {

  };



  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel={"send"}
        formSubmitHandler={(value) => addCommentHandler(value)}
        loading={isLoadingNewComment}
      />
      <div className="space-y-4 mt-8">
        {comments.map((comment, index) => (
          <Comment
            key={index}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            comment={comment}
            logginedUserId={logginedUserId}
            addComment={addCommentHandler}
            updateComment={updateCommentHandler}
            deleteComment={deleteCommentHandler}
            replies={comment.replies}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentContainer;
