import { Spacer } from "../../components/Layout";
import styles from "./Feed.module.css";
import Poster from "./Poster";
import PostList from "./PostList";
import CategoryList from "./CategoryList";
import HomeCardSettings from "../Settings/Component";

export const Feed = () => {
  return (
    <div className={styles.root}>
      <img alt="" src="/png/banner.png" />
      <CategoryList />
      <HomeCardSettings />
      {/* <Spacer size={1} axis="vertical" />      
      <Poster />
      <PostList /> */}
    </div>
  );
};
