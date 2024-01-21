import e from "express";
import prisma from "../DB/db.config.js";

export const createUser = async (req, res) => {
  //for
  try {
    const { name, email, password, age } = req.body;

    const findUser = await prisma.user.findUnique({
      //
      where: {
        email: email,
      },
    });
    if (findUser) {
      return res.json({
        status: 400,
        message: "Email already taken, use another one !",
      });
    }
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
        age: age,
      },
    });
    return res.json({
      status: 200,
      data: newUser,
      message: "User created successfully !",
    });
  } catch (error) {
    console.error(error);
    return res.json({ status: 500, message: error });
  } finally {
    await prisma.$disconnect();
  }
};

export const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const findUser = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    return res.json({
      status: 200,
      findUser,
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

export const getAllUsers = async (req, res) => {
  //const userId=req.params.id
  // const {name, email, age}= req.body
  try {
    const findUser = await prisma.user.findMany({
      include: {
        post: {
          select: {
            title: true,
            comment_count: true,
          },
        },
      },
    });
    return res.json({
      status: 200,
      data: findUser,
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

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, password } = req.body;

    await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        name,
        email,
        password,
      },
    });
    return res.json({
      status: 200,
      message: "User updated Successfully!",
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

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    //const {name, email, password} = req.body

    await prisma.user.delete({
      where: {
        id: Number(userId),
      },
    });
    return res.json({
      status: 200,
      message: "User Deleted Successfully!",
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
