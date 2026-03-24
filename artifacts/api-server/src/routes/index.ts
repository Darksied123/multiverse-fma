import { Router, type IRouter } from "express";
import healthRouter from "./health";
import charactersRouter from "./characters";
import statsRouter from "./stats";
import proxyRouter from "./proxy";

const router: IRouter = Router();

router.use(healthRouter);
router.use(proxyRouter);
router.use(charactersRouter);
router.use(statsRouter);

export default router;
