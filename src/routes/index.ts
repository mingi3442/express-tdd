import { Router } from "express";
import { ProductController } from "../controller";

const router = Router();

router.get("/", ProductController.getProduct);
router.post("/", ProductController.createProduct);

export default router;
