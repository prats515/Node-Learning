import e from "express";
import prisma from "../DB/db.config.js";

export const createPost =async(req, res) =>{ //for
    //try {
        const {user_id, title, description} = req.body

    
        const newPost = await prisma.post.create({
            data:{
                user_id:Number(user_id),
                title:title,
                description:description
            }
        })
        return res.json({status:200, data:newPost, message:"Post created successfully !"})
    // } catch (error) {
    //     console.error(error)
    //     return res.json({status:500, message:error})
    // }
}

export const getPostById= async (req,res) =>{
    const postId=req.params.id

    const findPost= await prisma.post.findUnique({
        where:{
            id:Number(postId)
        }
    })
    return res.json({
        status:200,
        findPost
    })
}
export const fetchAllPosts= async (req,res) =>{
    //const userId=req.params.id
    const posts= await prisma.post.findMany({})
    //const {name, email, age}= req.body
    return res.json({
        status:200,
        data:posts
    })
}

export const updatePost =async (req, res) =>{
    const postId= req.params.id
    const {title, description} = req.body

    await prisma.post.update({
        where:{
            id:Number(postId)
        },data:{
            title,description
        }
    })
    return res.json({
        status:200,
        message:"Post updated Successfully!"
    })
}

export const deletePost =async (req, res) =>{
    const postId= req.params.id
    //const {name, email, password} = req.body

    await prisma.post.delete({
        where:{
            id:Number(postId)
        }
    })
    return res.json({
        status:200,
        message:"Post Deleted Successfully!"
    })
}