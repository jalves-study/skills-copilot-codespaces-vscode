// Create web server

// Import express
const express = require("express");

// Create router
const router = express.Router();

// Import comments controller
const commentsController = require("../controllers/comments");

// Import middleware
const { checkToken } = require("../middlewares/auth");

// Import validator
const {
  validateComment,
  validateCommentUpdate,
} = require("../middlewares/validator");

// Import cache
const { cacheGetAllComments, cacheGetComment } = require("../middlewares/cache");

// Define routes
router.get("/:id", cacheGetComment, commentsController.getCommentById);
router.get("/", cacheGetAllComments, commentsController.getAllComments);
router.post(
  "/",
  checkToken,
  validateComment,
  commentsController.createComment
);
router.put(
  "/:id",
  checkToken,
  validateCommentUpdate,
  commentsController.updateComment
);
router.delete("/:id", checkToken, commentsController.deleteComment);

// Export router
module.exports = router;