import {
  Stack,
  Rating,
  Accordion,
  Pagination,
  AccordionDetails,
} from "@mui/material";

import AccordionSummaryComponent from "./AccordionSummary";

import ItemNotFound from "../../images/item_not_found.jpg";
import { ReactComponent as SendIcon } from "../../images/send_icon.svg";
import { ReactComponent as SortIcon } from "../../images/sort_icon.svg";
import { ReactComponent as TrashBoxIcon } from "../../images/trash_box_icon.svg";

import { getIconColor } from "../../helpers/functions";

import styles from "./PostsWithComments.module.scss";
import AddComment from "./AccordionDetails/AddComment/AddComment";
import UserData from "./AccordionDetails/UserData/UserData";

const PostsWithComments = (props) => {
  const {
    posts,
    comment,
    expanded,
    allPosts,
    searchQuery,
    currentPage,
    PAGES_COUNT,
    commentReply,
    replyCommentId,
    isReplyClicked,
    handlePageChange,
    handleSendComment,
    handleSortComments,
    handleCommentChange,
    handleAccordionChange,
    handleReplyButtonClick,
    handleSendCommentReply,
    handlePostCommentRating,
    handleDeletePostComment,
    handleSearchQueryChange,
    handleCommentReplyChange,
  } = props;

  return (
    <div className={styles.posts_with_comments_container}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        placeholder="Search..."
        className={styles.search_input}
      />
      {allPosts.length > 0 ? (
        allPosts.map((post) => (
          <Accordion
            key={post.id}
            expanded={expanded === post.id}
            onChange={handleAccordionChange(post.id)}
            className={styles.accordion}
          >
            <AccordionSummaryComponent post={post} />

            <AccordionDetails className={styles.accordion_details}>
              <AddComment
                comment={comment}
                post={post}
                handleCommentChange={handleCommentChange}
                handleSendComment={handleSendComment}
              />

              <SortIcon
                className={styles.sort_icon}
                onClick={() => handleSortComments(post)}
              />

              <div>
                {post.postsComments.map((comment) => (
                  <div className={styles.comments_container} key={comment.id}>
                    <div className={styles.comment_body}>
                      <div className={styles.comment}>
                        <UserData post={post} />
                        <div className={styles.comment_body_content}>
                          <p className={styles.comment_body_text}>
                            {comment.body}
                          </p>
                          <div className={styles.actions_container}>
                            <TrashBoxIcon
                              className={styles.trash_box_icon}
                              onClick={() =>
                                handleDeletePostComment(comment.id, post.id)
                              }
                            />

                            {isReplyClicked && replyCommentId === comment.id ? (
                              ""
                            ) : (
                              <button
                                onClick={() =>
                                  handleReplyButtonClick(comment.id)
                                }
                                className={styles.reply_button}
                              >
                                Reply
                              </button>
                            )}

                            <Rating
                              className={styles.rating_icon}
                              value={+comment.rate}
                              precision={0.5}
                              onChange={(e) =>
                                handlePostCommentRating({
                                  value: e.target.value,
                                  postId: post.id,
                                  commentId: comment.id,
                                })
                              }
                              onChangeActive={(event, newHover) => {
                                // Handle hover effect if needed
                              }}
                              style={{ color: getIconColor(comment.rate) }}
                            />
                          </div>
                        </div>
                        {isReplyClicked && replyCommentId === comment.id && (
                          <div className={styles.reply_container}>
                            <textarea
                              placeholder="Reply"
                              className={styles.reply_textarea}
                              value={commentReply}
                              onChange={handleCommentReplyChange}
                              onKeyDown={(event) =>
                                handleSendCommentReply(event, comment.id)
                              }
                            />
                            <SendIcon
                              className={styles.reply_comment_icon}
                              onClick={(event) =>
                                handleSendCommentReply(event, comment.id, true)
                              }
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <img src={ItemNotFound} alt="" className={styles.item_not_found} />
      )}
      {allPosts.length > 0 ? (
        <Stack spacing={2} className={styles.pagination_container}>
          <Pagination
            count={Math.ceil(posts.length / PAGES_COUNT)}
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
      ) : (
        ""
      )}
    </div>
  );
};

export default PostsWithComments;
