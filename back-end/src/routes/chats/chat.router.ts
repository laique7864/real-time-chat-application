import express from "express";
import { chatController } from "../../controller/chat/chat.controller";
import { auth } from "../../middleware/auth/index";
import { chatService } from "../../services/chat/chaService";
import { sanitizeAllowedFields } from "../../helper/basic";

export const chatRouter = express.Router();


chatRouter.post(
  "/create",
  auth,

  (req: express.Request, res: express.Response) => {
    chatController.create(req, res);
  }
);

chatRouter.get(
  "/getChats",
  auth,
  (req: express.Request, res: express.Response) => {
    chatController.getChats(req, res);
  }
);

