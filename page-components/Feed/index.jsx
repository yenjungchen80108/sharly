import { Spacer } from '../../components/Layout';
import styles from './Feed.module.css';
import Poster from './Poster';
import PostList from './PostList';
import CategoryList from './CategoryList';

export const Feed = () => {
  return (
    <div className={styles.root}>
      <CategoryList />
      <Spacer size={1} axis="vertical" />      
      <Poster />
      <PostList />
    </div>
  );
};
