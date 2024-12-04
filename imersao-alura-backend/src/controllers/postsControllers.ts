import "dotenv/config"
import fs from "fs";
import { Request, Response } from "express";
import Post from "../types/Post"
import generateDescriptionWithGemini from "../services/geminiService";
import { createOnePost, getAllPosts, updatePost} from "../models/postsModel";


export async function getPosts(req: Request, res: Response) {
    const posts = await getAllPosts();
    res.status(200).json(posts);
}

export async function createPost(req:Request, res:Response) {
    const {description, img_uri, alt} = req.body;
    try {
        const newPost = {description, img_uri, alt};
        const createdPost = createOnePost(newPost);
         res.status(201).json(req.body);
    } catch (error) {
         res.status(500).json({message: "Server error"});
    }
}

export async function uploadImage(req: Request, res: Response)  {
    try {
        const newPost: Post = {
            description: "",
            img_uri: `/uploads/${req.file?.originalname}`,
            alt: ""
        }
        const createdPost = await createOnePost(newPost);
        const updateImageUri = `uploads/${createdPost?.insertedId}.png`;
        
        fs.renameSync(req.file?.path ?? "default/path", updateImageUri);

        res.status(201).json(createdPost);
    
    } catch (error) {
        res.status(500).json({message: "Server error"});
   }

}

export async function updateNewPost(req: Request, res: Response) {
    const id = (req.params.id);
    const uriImage = `http://localhost:${process.env.PORT}/${id}.png`;

    try {
        const imgBuffer = fs.readFileSync(`./uploads/${id}.png`);
        const description = await generateDescriptionWithGemini(imgBuffer);

        const newPost: Post = {
            img_uri: uriImage,
            description,
            alt: req.body.alt
        }

        const updatedPost = await updatePost(id ,newPost);
        res.status(201).json(updatedPost);
    } catch(error:any) {
        res.status(500).json({message: "server error"});
    }
    
}