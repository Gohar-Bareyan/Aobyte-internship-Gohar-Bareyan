import { RATE_COLORS, RATE_NUMBERS, PAGES_COUNT } from "../constants";

export const getIconColor = (averageRate) => {
  switch (true) {
    case averageRate > RATE_NUMBERS.FOUR:
      return RATE_COLORS.DARK_GREEN;
    case averageRate > RATE_NUMBERS.THREE:
      return RATE_COLORS.LIGHT_GREEN;
    case averageRate > RATE_NUMBERS.TWO:
      return RATE_COLORS.YELLOW;
    case averageRate > RATE_NUMBERS.ONE:
      return RATE_COLORS.ORANGE;
    default:
      return RATE_COLORS.RED;
  }
};

  export const filteredPosts = function filterData(currentPage, posts, searchQuery) {
    const startIndex = (currentPage - 1) * PAGES_COUNT;
    const endIndex = startIndex + PAGES_COUNT;
    const paginatedPostsData = posts?.slice(startIndex, endIndex);

    const filteredPosts = paginatedPostsData.filter((post) =>
      post.postsComments.some((comment) =>
        comment.body.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    return filteredPosts;
  };
