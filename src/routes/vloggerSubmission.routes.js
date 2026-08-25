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

import { authenticate } from "../middleware/auth.middleware.js";
import { requireVerifiedVlogger } from "../middleware/vlogger.middleware.js";
import { authorize } from "../middleware/authorize.js";

import { authorizeSubmissionOwnership } from "../middleware/submissionOwnership.js";
import { requirePendingSubmission } from "../middleware/submissionStatus.js";

const router = express.Router();

router.post("/", authenticate, requireVerifiedVlogger, validate(createVloggerSubmissionSchema), asyncHandler(createVloggerSubmission));
router.get("/", asyncHandler(getVloggerSubmissions));
router.get("/:submissionId", authenticate, authorizeSubmissionOwnership, asyncHandler(getVloggerSubmissionById));
router.patch("/:submissionId", authenticate, requireVerifiedVlogger, authorizeSubmissionOwnership, requirePendingSubmission, validate(updateVloggerSubmissionSchema), asyncHandler(updateVloggerSubmission));
router.delete("/:submissionId", authenticate, requireVerifiedVlogger, authorizeSubmissionOwnership, requirePendingSubmission, asyncHandler(deleteVloggerSubmission));
router.patch("/:submissionId/approve", authenticate, authorize("ADMIN"), asyncHandler(approveVloggerSubmission));
router.patch("/:submissionId/reject", authenticate, authorize("ADMIN"), asyncHandler(rejectVloggerSubmission));

export default router;