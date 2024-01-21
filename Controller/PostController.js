import e from "express";
import prisma from "../DB/db.config.js";

export const createPost = async (req, res) => {
  //for
  try {
    const { user_id, title, description } = req.body;

    const newPost = await prisma.post.create({
      data: {
        user_id: Number(user_id),
        title: title,
        description: description,
      },
    });
    return res.json({
      status: 200,
      data: newPost,
      message: "Post created successfully !",
    });
  } catch (error) {
    console.error(error);
    return res.json({ status: 500, message: error });
  } finally {
    await prisma.$disconnect();
  }
};

export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    const findPost = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });
    return res.json({
      status: 200,
      findPost,
    });
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).json({
      status: 500,
      error: "Internal Server Error",
    });
  } finally {
    await prisma.$disconnect();
  }
};
export const fetchAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({});
    return res.json({
      status: 200,
      data: posts,
    });
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).json({
      status: 500,
      error: "Internal Server Error",
    });
  } finally {
    await prisma.$disconnect();
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, description } = req.body;

    await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        title,
        description,
      },
    });
    return res.json({
      status: 200,
      message: "Post updated Successfully!",
    });
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).json({
      status: 500,
      error: "Internal Server Error",
    });
  } finally {
    await prisma.$disconnect();
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    await prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });
    return res.json({
      status: 200,
      message: "Post Deleted Successfully!",
    });
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).json({
      status: 500,
      error: "Internal Server Error",
    });
  } finally {
    await prisma.$disconnect();
  }
};
