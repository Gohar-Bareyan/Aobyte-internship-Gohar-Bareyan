import { useEffect, useReducer } from "react";

import MainContainer from "./containers/Main";
import { initialState } from "./store/state";
import { postsReducer } from "./store/reducer";
import { DataContext } from "./store/dataContext";

import { getPosts } from "./api";

import "./index.scss";

const App = () => {
  const [state, dispatch] = useReducer(postsReducer, initialState);

  const fetchData = async () => {
    try {
      const posts = await getPosts();
      dispatch({ type: "SET_POSTS", payload: posts });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      <MainContainer />
    </DataContext.Provider>
  );
};

export default App;
