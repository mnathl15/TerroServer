import express from "express";
import { getStimuli } from "../controllers/stimuli.js";

const router = express.Router();

router.get("/", getStimuli);

export default router;
