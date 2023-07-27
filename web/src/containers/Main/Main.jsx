import { useContext } from "react";

import { DataContext } from "../../store/dataContext";
import ColumnLayoutContainer from "../ColumnLayout";
import PostsWithCommentsContainer from "../PostsWithComments";

import styles from "./Main.module.scss";

const MainContainer = () => {
  const {
    state: { posts },
  } = useContext(DataContext);

  return (
    <>
      <div className={styles.main_container}>
        <PostsWithCommentsContainer posts={posts} />
        <ColumnLayoutContainer posts={posts} />
      </div>
    </>
  );
};

export default MainContainer;
