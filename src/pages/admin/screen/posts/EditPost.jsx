import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSinglePosts, updatePost } from "../../../../services/index/post";
import { useParams } from "react-router-dom";
import ArticleDetailSkeleton from "../../../articleDetail/components/ArticleDetailSkeleton";
import ErrorMessage from "../../../../components/ErrorMessage";
import { useState } from "react";
import { useEffect } from "react";

import { stables } from "../../../../constants";
import { HiOutlineCamera } from "react-icons/hi";
import toast from "react-hot-toast";
import Editor from "../../../../components/editor/Editor";
import { useSelector } from "react-redux";

const EditPost = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const [initialPhoto, setInitialPhoto] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [body, setbody] = useState(null);

  const userState = useSelector((state) => state.user);

  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getSinglePosts({ slug }),

    queryKey: ["blog", slug],
  });

  useEffect(() => {
    if (!isLoading && !isError) {
      setInitialPhoto(data?.photo);
    }
  }, [isError, isLoading, data]);

  const { mutate: mutateUpdatePostDetail } = useMutation({
    mutationFn: ({ updatedData, slug, token }) => {
      return updatePost({ updatedData, slug, token });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["blog", slug]);
      toast.success("Post is updated");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleUpdatePost = async () => {
    let updatedData = new FormData();

    if (!initialPhoto && photo) {
      updatedData.append("postPicture", photo);
    } else if (initialPhoto && !photo) {
      const urlToObject = async (url) => {
        let response = await fetch(url);
        let blob = await response.blob();
        const file = new File([blob], initialPhoto, { type: blob.type });
        return file;
      };
      const picture = await urlToObject(
        stables.UPLOAD_FOLDER_BASE_URL + data?.photo
      );
      updatedData.append("postPicture", picture);
    }
    updatedData.append("document", JSON.stringify({ body }));
    mutateUpdatePostDetail({
      updatedData,
      slug,
      token: userState?.userInfo?.token,
    });
  };

  const handleDeleteImage = () => {
    if (window.confirm("Do you want to delete your Post picture?")) {
      setInitialPhoto(null);
      setPhoto(null);
    }
  };

  return (
    <div>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message={"Couldn't found post detail"} />
      ) : (
        <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1 h-fit overflow-auto">
            <label htmlFor="postPicture" className="w-full cursor-pointer">
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt={data?.title}
                  className="rounded-xl w-full"
                />
              ) : initialPhoto ? (
                <img
                  src={stables.UPLOAD_FOLDER_BASE_URL + data?.photo}
                  alt={data?.title}
                  className="rounded-xl w-full h-4/5"
                />
              ) : (
                <div className="w-full min-h-[200px] bg-dark-soft flex justify-center">
                  <HiOutlineCamera className="w-7 h-auto text-primary" />
                </div>
              )}
            </label>
            <input
              type="file"
              className="sr-only"
              id="postPicture"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={handleDeleteImage}
              className="w-fit bg-red-500 text-sm text-white font-semibold rounded-lg px-2 py-1 mt-5"
            >
              Delete Image
            </button>

            <h1 className="md:text-[26px] text-xl font-medium font-roboto mt-4 text text-dark-hard">
              {data?.title}
            </h1>
            {/* <div className="mt-4 text-dark-hard">{ <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={data?.body}/>}</div> */}
            <div className="w-full">
              {!isLoading && !isError && (
                <Editor
                  content={data?.body}
                  editable={true}
                  onDataChange={(data) => {
                    setbody(data);
                  }}
                />
              )}
            </div>

            <button
              type="button"
              onClick={handleUpdatePost}
              className="w-full bg-green-500 text-white font-semibold rounded-lg px-4 py-2"
            >
              Update
            </button>
          </article>
        </section>
      )}
    </div>
  );
};

export default EditPost;
