import { Router } from "express";
import { GenerateID, GetUrl } from "../Controllers/generateId.js";

const router = Router();

router.post("/url", GenerateID);
router.get("/:id", GetUrl);

export default router;
