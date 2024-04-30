import axios from "axios";

export const getAllPosts = async () => {
  try {
    const { data } = await axios.get("http://localhost:8000/api/posts");
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getSinglePosts = async ({ slug }) => {
  console.log(slug, "from post");
  try {
    const { data } = await axios.get(`http://localhost:8000/api/posts/${slug}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
