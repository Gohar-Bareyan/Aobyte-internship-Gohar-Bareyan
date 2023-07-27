import { ReactComponent as SendIcon } from "../../../../images/send_icon.svg";

import styles from "./AddComment.module.scss";

const AddComment = (props) => {
  const { comment, post, handleCommentChange, handleSendComment } = props;
  return (
    <div className={styles.add_comment_textarea_container}>
      <textarea
        placeholder="Add a comment"
        className={styles.add_comment_textarea}
        value={comment}
        onChange={handleCommentChange}
        onKeyDown={(event) => handleSendComment(event, post.id)}
      />
      <SendIcon
        className={styles.send_comment_icon}
        onClick={(event) => handleSendComment(event, post.id, true)}
      />
    </div>
  )
};

export default AddComment;