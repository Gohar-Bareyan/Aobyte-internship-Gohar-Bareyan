const express = require("express");
const { PostsController } = require("./Controllers/PostsController");
const { PostCommentsController } = require("./Controllers/PostCommentsController");
const { PostCommentRepliesController } = require("./Controllers/PostCommentRepliesController");

const router = express.Router();

// Post routes
router.get("/get-posts", PostsController.getPosts);

// Post Comments routes
router.post("/add-post-comment", PostCommentsController.addPostComment);
router.delete("/delete-post-comment/:commentId", PostCommentsController.deletePostComment)
router.patch("/rate-post-comment", PostCommentsController.ratePostComment)

//Post Comment Replies
router.post("/add-post-comment-reply", PostCommentRepliesController.addPostCommentReply)


module.exports = { router };
