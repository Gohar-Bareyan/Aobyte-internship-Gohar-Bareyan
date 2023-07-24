import moment from "moment";
import { Typography, Avatar } from "@mui/material";

import { UNKNOWN } from "../../../../constants";

import styles from "./UserData.module.scss";

const UserData = ({ post, style }) => {
  const containerStyle = {
    ...style?.container,
  };
  const avatarStyle = { ...style?.avatar };
  const nameDateContainerStyle = {
    ...style?.nameDateContainer,
  };
  const nameStyle = { ...style?.name };
  const dateStyle = { ...style?.date };

  return (
    <div
      className={styles.comment_sender_data_container}
      style={containerStyle}
    >
      <Avatar className={styles.avatar} style={avatarStyle} />
      <div
        className={styles.name_date_container}
        style={nameDateContainerStyle}
      >
        <Typography className={styles.name} style={nameStyle}>
          {UNKNOWN}
        </Typography>
        <Typography className={styles.date} style={dateStyle}>
          {moment(post.createdAt).format("YYYY-MM-DD")}
        </Typography>
      </div>
    </div>
  );
};

export default UserData;
