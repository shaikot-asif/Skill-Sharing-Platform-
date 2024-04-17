import { uploadPicture } from "../middleware/uploadPirctureMiddleware.js";
import Post from "../models/Post.js";
import { v4 as uuid4 } from "uuid";
import { fileRemover } from "../utils/fileRemover.js";

const createPost = async (req, res, next) => {
  try {
    const post = new Post({
      title: "sample title",
      caption: "sample caption",
      slug: uuid4(),
      body: {
        type: "doc",
        content: [],
      },
      photo: "",
      user: req.user._id,
    });

    const createdPost = await post.save();
    return res.json(createdPost);
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      const error = new Error("Post was not found");
      next(error);
      return;
    }

    const upload = uploadPicture.single("postPicture"); // 'postPicture' should match the name attribute in your HTML form

    const handleUpdatePostData = async (data) => {
      const { title, caption, slug, body, tags, categories } = JSON.parse(data);
      post.title = title || post.title;
      post.caption = caption || post.caption;
      post.slug = slug || post.slug;
      post.body = body || post.body;
      post.tags = tags || post.tags;
      post.categories = categories || post.categories;
      const updatedPost = await post.save();
      return res.json(updatedPost);
    };

    upload(req, res, async function (err) {
      if (err) {
        const error = new Error(
          "An unknown error occured when uploading " + err.message
        );
        next(error);
      } else {
        // every thing went well
        if (req.file) {
          let filename;
          filename = post.photo;
          if (filename) {
            fileRemover(filename);
          }
          post.photo = req.file.filename;
          handleUpdatePostData(req.body.document);
        } else {
          let filename;
          filename = post.photo;
          post.photo = "";
          fileRemover(filename);
          handleUpdatePostData(req.body.document);
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export { createPost, updatePost };
