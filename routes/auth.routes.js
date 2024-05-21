import express from "express";
import { login, signUp } from "../controllers/auth.controller.js";
const router = express.Router();

// Auth Routes

router.post("/login", login);

router.post("/signUp", signUp);

export default router;
