//server/routes/portfolioRoute.js


import express from "express";
import { sendEmailController } from "../controllers/portfolioController.js";

const router = express.Router();

// Definiera route för att skicka e-post
router.post("/sendEmail", sendEmailController);

// Exportera routern
export default router;


