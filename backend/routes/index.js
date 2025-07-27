import express from "express";
import contactRoutes from "./contact.js";

const contactRouter = express.Router();

contactRouter.use('/contact', contactRoutes);

export default contactRouter;