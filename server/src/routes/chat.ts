import { Router } from "express";
import { createChat, sendMessage, getChats, getMessages } from "../controllers/chatController";

const router = Router();

router.post("/chat", createChat);              // create new chat
router.get("/chat", getChats);                 // get all chats
router.get("/chat/:chatId", getMessages);      // get messages
router.post("/chat/:chatId/message", sendMessage); // send message

export default router;