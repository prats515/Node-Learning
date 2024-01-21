import e from "express";
import prisma from "../DB/db.config.js";

export const createComment = async (req, res) => {
  //for
  try {
    const { user_id, post_id, comment } = req.body;

    const newPost = await prisma.comment.create({
      data: {
        user_id: Number(user_id),
        post_id: Number(post_id),
        post_id,
        comment,
      },
    });
    return res.json({
      status: 200,
      data: newPost,
      message: "Comment created successfully !",
    });
  } catch (error) {
    console.error(error);
    return res.json({ status: 500, message: error });
  } finally {
    await prisma.$disconnect();
  }
};

export const getCommentById = async (req, res) => {
  try {
    const comment_id = req.params.id;

    const findComment = await prisma.comment.findUnique({
      where: {
        id: Number(comment_id),
      },
    });
    return res.json({
      status: 200,
      findComment,
    });
  } catch (error) {
    console.error(error);
    return res.json({ status: 500, message: error });
  } finally {
    await prisma.$disconnect();
  }
};
export const fetchAllComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({});
    //const {name, email, age}= req.body
    return res.json({
      status: 200,
      data: comments,
    });
  } catch (error) {
    console.error(error);
    return res.json({ status: 500, message: error });
  } finally {
    await prisma.$disconnect();
  }
};

// export const updatePost =async (req, res) =>{
//     const postId= req.params.id
//     const {title, description} = req.body

//     await prisma.comment.update({
//         where:{
//             id:Number(postId)
//         },data:{
//             title,description
//         }
//     })
//     return res.json({
//         status:200,
//         message:"Post updated Successfully!"
//     })
// }

export const deleteComment = async (req, res) => {
  try {
    const comment_id = req.params.id;
    //const {name, email, password} = req.body

    await prisma.comment.delete({
      where: {
        id: Number(comment_id),
      },
    });
    return res.json({
      status: 200,
      message: "Comment Deleted Successfully!",
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
