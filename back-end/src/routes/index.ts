import express from "express";
import { userRouter } from "./user/user.router";
import { chatRouter } from "./chats/chat.router";



const apiRoutes = express.Router();

apiRoutes.use("/user", userRouter);
apiRoutes.use("/chat", chatRouter);
export default apiRoutes;

