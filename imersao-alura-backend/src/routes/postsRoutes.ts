import express from "express";
import multer from "multer";
import cors from 'cors';
import { getPosts, createPost, uploadImage, updateNewPost } from '../controllers/postsControllers';

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSucessStatus: 200,
}

const router = express.Router();
const upload = multer({dest: "./uploads"});

router.use(cors(corsOptions));
router.get("/posts", getPosts);
router.post("/posts", createPost);
router.post("/upload", upload.single('image'), uploadImage);
router.put("/upload/:id", updateNewPost);

export default router;