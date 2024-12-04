import express from "express";
import "dotenv/config";
import router from "./routes/postsRoutes";

const app = express();
app.use(express.json());
app.use(express.static("uploads"));
app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running at http://localhost:${process.env.PORT}`));