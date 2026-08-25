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

const router = express.Router();

router.post("/", validate(createVloggerSubmissionSchema), createVloggerSubmission);
router.get("/", getVloggerSubmissions);
router.get("/:submissionId", getVloggerSubmissionById);
router.patch("/:submissionId", validate(updateVloggerSubmissionSchema), updateVloggerSubmission);
router.delete("/:submissionId", deleteVloggerSubmission);
router.patch("/:submissionId/approve", approveVloggerSubmission);
router.patch("/:submissionId/reject", rejectVloggerSubmission);

export default router;