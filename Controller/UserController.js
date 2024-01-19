import e from "express";
import prisma from "../DB/db.config.js";

export const createUser =async(req, res) =>{
    const {name, email, password} = req.body

    const findUser= await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    if(findUser){
        return res.json({status:400, message:"Email already taken, use another one !"})
    }
    const newUser = await prisma.user.create({
        data:{
            name:name,
            email:email,
            password:password
        }
    })
    return res.json({status:200, data:newUser, message:"User created successfully !"})
}