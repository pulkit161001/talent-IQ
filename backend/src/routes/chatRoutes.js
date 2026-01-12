import express from "express";
import { getStreamToken } from "../controllers/chatController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

//to join a call in stream, we require stream token
// only authenticated user can request a token
router.get("/token", protectRoute, getStreamToken);

export default router;
