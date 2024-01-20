import { Router } from "express";
import { createComment, getCommentById, fetchAllComments, deleteComment } from "../Controller/CommentController.js";

const router=Router();

router.post("/",createComment);

//router.put("/:id",updatePost);

router.get("/:id",getCommentById);
router.get("/",fetchAllComments);
router.delete("/:id",deleteComment);

export default router;