import { Router } from "express";
import { createPost, updatePost, getPostById, fetchAllPosts, deletePost } from "../Controller/PostController.js";

const router=Router();

router.post("/",createPost);

router.put("/:id",updatePost);

router.get("/:id",getPostById);
router.get("/",fetchAllPosts);
router.delete("/:id",deletePost);

export default router;