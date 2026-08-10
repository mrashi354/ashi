import { Router, type IRouter } from "express";
import admissionsRouter from "./admissions";
import aiRouter from "./ai";
import contactRouter from "./contact";
import healthRouter from "./health";

const router: IRouter = Router();

router.use(healthRouter);
router.use(admissionsRouter);
router.use(contactRouter);
router.use(aiRouter);

export default router;
