const { calculateAverageRate } = require('../helpers');
const { Posts } = require('../models/index');


class PostsController {

  static async getPosts(req, res) {
    try {
      const allPosts = await Posts.findAll({ include: { all: true, nested: true } });

      allPosts.forEach((post) => {
        post.averageRate = calculateAverageRate(post.posts_comments);
        post.posts_comments.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.updatedAt).getTime();
          return dateB - dateA;
        })
      });

      res.send(allPosts);
    } catch (error) {
      console.error('getPosts Error', error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = { PostsController }