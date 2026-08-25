import express from "express";

import {
  createVloggerSubmission,
  getVloggerSubmissions,
  getVloggerSubmissionById,
  updateVloggerSubmission,
  deleteVloggerSubmission,
  approveVloggerSubmission,
  rejectVloggerSubmission,
} from "../controllers/vloggerSubmission.controller.js";

import { validate } from "../middleware/validate.js";

import {
  createVloggerSubmissionSchema,
  updateVloggerSubmissionSchema,
} from "../validators/vloggerSubmission.validator.js";

import { asyncHandler } from "../middleware/asyncHandler.js";

const router = express.Router();

router.post("/", validate(createVloggerSubmissionSchema), asyncHandler(createVloggerSubmission));
router.get("/", asyncHandler(getVloggerSubmissions));
router.get("/:submissionId", asyncHandler(getVloggerSubmissionById));
router.patch("/:submissionId", validate(updateVloggerSubmissionSchema), asyncHandler(updateVloggerSubmission));
router.delete("/:submissionId", asyncHandler(deleteVloggerSubmission));
router.patch("/:submissionId/approve", asyncHandler(approveVloggerSubmission));
router.patch("/:submissionId/reject", asyncHandler(rejectVloggerSubmission));

export default router;