import { Router, type IRouter } from "express";
import {
  RunProductResearchBody,
  RunProductResearchResponse,
} from "@workspace/api-zod";
import { researchProvider } from "../research/unavailable-provider";

const router: IRouter = Router();

router.post("/research", async (req, res) => {
  const parsedBody = RunProductResearchBody.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(400).json({
      error: "Enter a product or niche before starting research.",
    });
    return;
  }

  try {
    const result = await researchProvider.research(parsedBody.data.query.trim());
    res.json(RunProductResearchResponse.parse(result));
  } catch (error) {
    req.log.error({ err: error }, "Product research pipeline failed");
    res.status(500).json({
      error: "Research is temporarily unavailable. Please try again.",
    });
  }
});

export default router;