import React, { useState, useEffect } from "react";
import { ReactComponent as AddIcon } from "../../images/add_icon.svg";
import { ReactComponent as SortIcon } from "../../images/sort_icon.svg";
import ColumnLayout from "../../components/ColumnLayout";

const ColumnLayoutContainer = ({ posts }) => {
  const [leftColumnPosts, setLeftColumnPosts] = useState([]);
  const [rightColumnPosts, setRightColumnPosts] = useState([]);
  const [postsSortedByRating, setPostsSortedByRating] = useState([]);
  const [isDescendingOrder, setIsDescendingOrder] = useState(true);

  useEffect(() => {
    const sortedPosts = [...posts].sort(
      (a, b) => b.averageRate - a.averageRate
    );
    setPostsSortedByRating(sortedPosts);
  }, [posts]);

  const handleAddSinglePost = (column) => {
    if (postsSortedByRating.length === 0) {
      return;
    }

    if (column === "leftColumnPosts") {
      setLeftColumnPosts((prevLeftColumnPosts) => [
        ...prevLeftColumnPosts,
        postsSortedByRating.shift(),
      ]);
    } else if (column === "rightColumnPosts") {
      setRightColumnPosts((prevRightColumnPosts) => [
        ...prevRightColumnPosts,
        postsSortedByRating.shift(),
      ]);
    }
  };

  const handleDeleteSinglePost = (column, postId) => {
    const columnPosts =
      column === "leftColumnPosts" ? leftColumnPosts : rightColumnPosts;
    const deletedPost = columnPosts.find((post) => post.id === postId);

    if (deletedPost) {
      const updatedColumnPosts = columnPosts.filter(
        (post) => post.id !== postId
      );
      setPostsSortedByRating((prevPostsSortedByRating) => [
        deletedPost,
        ...prevPostsSortedByRating,
      ]);

      if (column === "leftColumnPosts") {
        setLeftColumnPosts(updatedColumnPosts);
      } else if (column === "rightColumnPosts") {
        setRightColumnPosts(updatedColumnPosts);
      }
    }
  };

  const handleSortPosts = (column) => {
    const posts =
      column === "leftColumnPosts"
        ? [...leftColumnPosts]
        : [...rightColumnPosts];

    posts.sort((a, b) => {
      if (isDescendingOrder) {
        return a.averageRate - b.averageRate;
      }
      return b.averageRate - a.averageRate;
    });

    setIsDescendingOrder((prevIsDescendingOrder) => !prevIsDescendingOrder);

    if (column === "leftColumnPosts") {
      setLeftColumnPosts(posts);
    } else if (column === "rightColumnPosts") {
      setRightColumnPosts(posts);
    }
  };

  const leftPartActions = [
    {
      icon: <AddIcon onClick={() => handleAddSinglePost("leftColumnPosts")} />,
      name: "Add",
    },
    {
      icon: <SortIcon onClick={() => handleSortPosts("leftColumnPosts")} />,
      name: "Sort",
    },
  ];

  const rightPartActions = [
    {
      icon: <AddIcon onClick={() => handleAddSinglePost("rightColumnPosts")} />,
      name: "Add",
    },
    {
      icon: <SortIcon onClick={() => handleSortPosts("rightColumnPosts")} />,
      name: "Sort",
    },
  ];

  return (
    <ColumnLayout
      leftColumnPosts={leftColumnPosts}
      leftPartActions={leftPartActions}
      rightPartActions={rightPartActions}
      rightColumnPosts={rightColumnPosts}
      handleDeleteSinglePostOnLeft={(postId) =>
        handleDeleteSinglePost("leftColumnPosts", postId)
      }
      handleDeleteSinglePostOnRight={(postId) =>
        handleDeleteSinglePost("rightColumnPosts", postId)
      }
    />
  );
};

export default ColumnLayoutContainer;
