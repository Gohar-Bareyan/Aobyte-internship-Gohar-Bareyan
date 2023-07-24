const { PostCommentReplies } = require("../models/index");

class PostCommentRepliesController {

  static async addPostCommentReply(req, res) {

    try {
      const { commentId, commentReply } = req.body

      const postCommentReplies = await PostCommentReplies.create({
        content: commentReply,
        postCommentId: commentId,
      })

      res.send(postCommentReplies)
    } catch (error) {
      console.error('addCommentReplies Error', error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = { PostCommentRepliesController };