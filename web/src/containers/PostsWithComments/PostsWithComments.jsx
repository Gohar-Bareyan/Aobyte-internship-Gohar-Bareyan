import React, { useContext, useState } from "react";

import PostsWithComments from "../../components/PostsWithComments";
import { addPostComment, deletePostComment, ratePostComment } from "../../api";
import { DataContext } from "../../store/dataContext";
import { PAGES_COUNT } from "../../constants";
import { filteredPosts } from "../../helpers/functions";
import { addPostCommentReply } from "../../api";

const PostsWithCommentsContainer = (props) => {
  const { posts } = props;

  const { dispatch } = useContext(DataContext);
  
  const [comment, setComment] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [commentReply, setCommentReply] = useState("");
  const [replyCommentId, setReplyCommentId] = useState(null);
  const [isReplyClicked, setIsReplyClicked] = useState(false);
  const [isDescendingOrder, setIsDescendingOrder] = useState(true);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSendComment = async (event, postId, isClicked = false) => {
    if (event.key === "Enter" || isClicked) {
      event.preventDefault();
      try {
        const newPostComment = await addPostComment({
          postId,
          comment,
          sender: "Gohar Bareyan",
        });

        setComment("");

        const modifiedPosts = posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              postsComments: [newPostComment, ...post.postsComments],
            };
          }

          return post;
        });

        dispatch({ type: "SET_POSTS", payload: modifiedPosts });
      } catch (error) {
        console.error("Error sending comment:", error);
      }
    }
  };

  const handleDeletePostComment = async (commenId, postId) => {
    try {
      await deletePostComment(commenId);

      const modifiedPosts = posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            postsComments: post.postsComments.filter(
              (postComment) => postComment.id !== commenId
            ),
          };
        }

        return post;
      });
      dispatch({ type: "SET_POSTS", payload: modifiedPosts });
    } catch (error) {
      console.log("Error deleting comment", error);
    }
  };

  const handlePostCommentRating = async (data) => {
    const { commentId, value } = data;

    try {
      await ratePostComment(commentId, value);

      const updatedPosts = posts.map((post) => {
        const updatedComments = post.postsComments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, rate: value };
          }
          return comment;
        });

        return { ...post, postsComments: updatedComments };
      });

      dispatch({ type: "SET_POSTS", payload: updatedPosts });
    } catch (error) {
      console.log("Error rating comment", error);
    }
  };

  const handleSortComments = (post) => {
    post.postsComments.sort((a, b) => {
      if (isDescendingOrder) {
        return a.rate - b.rate;
      }
      return b.rate - a.rate;
    });

    setIsDescendingOrder((prevIsDescendingOrder) => !prevIsDescendingOrder);
  };

  const handleReplyButtonClick = (postId) => {
    setIsReplyClicked(true);
    setReplyCommentId(postId);
  };

  const handleCommentReplyChange = (event) => {
    setCommentReply(event.target.value);
  };

  const handleSendCommentReply = async (
    event,
    commentId,
    isClicked = false
  ) => {
    if (event.key === "Enter" || isClicked) {
      event.preventDefault();

      try {
        await addPostCommentReply({
          commentId,
          commentReply,
        });

        setCommentReply("");

      } catch (error) {
        console.error("Error sending comment:", error);
      }
    }
  };

  const allPosts = filteredPosts(currentPage, posts, searchQuery);

  return (
    <PostsWithComments
      posts={posts}
      comment={comment}
      expanded={expanded}
      allPosts={allPosts}
      PAGES_COUNT={PAGES_COUNT}
      currentPage={currentPage}
      searchQuery={searchQuery}
      commentReply={commentReply}
      replyCommentId={replyCommentId}
      isReplyClicked={isReplyClicked}
      handlePageChange={handlePageChange}
      handleSendComment={handleSendComment}
      handleSortComments={handleSortComments}
      handleCommentChange={handleCommentChange}
      handleAccordionChange={handleAccordionChange}
      handleSendCommentReply={handleSendCommentReply}
      handleReplyButtonClick={handleReplyButtonClick}
      handlePostCommentRating={handlePostCommentRating}
      handleDeletePostComment={handleDeletePostComment}
      handleSearchQueryChange={handleSearchQueryChange}
      handleCommentReplyChange={handleCommentReplyChange}
    />
  );
};

export default PostsWithCommentsContainer;
