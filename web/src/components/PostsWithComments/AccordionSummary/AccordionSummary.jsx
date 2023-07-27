import { Typography, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import UserData from "../AccordionDetails/UserData/UserData";

import { getIconColor } from "../../../helpers/functions";

import styles from "./AccordionSummary.module.scss";

const AccordionSummaryComponent = ({ post }) => {
  const customStyles = {
    container: {
      display: "flex",
      alignItems: "center",
      marginLeft: "70px",
      marginBottom: "12px",
    },
    avatar: {
      width: "40px",
      height: "40px",
    },
    nameDateContainer: {
      marginLeft: "10px",
    },
    name: {
      fontSize: "15px",
      fontWeight: "600",
    },
    date: {
      fontSize: "11px",
      marginTop: "-2px",
      marginLeft: "4px",
    },
  };

  return (
    <AccordionSummary
      expandIcon={
        <>
          <FontAwesomeIcon
            icon={faStar}
            beat
            style={{ color: getIconColor(post.averageRate) }}
          />
          <ExpandMoreIcon className={styles.expand_icon} />
        </>
      }
      className={styles.accordion_summary}
    >
      <div>
        <UserData post={post} style={customStyles} />
        <Typography className={styles.post_body}>{post.body}</Typography>
      </div>
    </AccordionSummary>
  );
};

export default AccordionSummaryComponent;
