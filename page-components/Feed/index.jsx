import styles from "./Feed.module.css";
import CategoryList from "./CategoryList";
import HomeCardSettings from "../Settings/Category";

export const Feed = () => {
  return (
    <div className={styles.root}>
      <img alt="" src="/png/banner.png" />
      <CategoryList />
      <HomeCardSettings />
    </div>
  );
};
