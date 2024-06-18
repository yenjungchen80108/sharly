import LoadingDots from "../components/LoadingDots/LoadingDots";
import styles from "../components/LoadingDots/LoadingDots.module.css";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/LoadingDots",
  component: LoadingDots,
  argTypes: {
    numberOfChildren: {
      type: "number",
      defaultValue: 3,
    },
  },
};

const Template = ({ numberOfChildren, ...args }) => (
  <span className={styles.loading}>
    <div className={styles.child}>
      Loading
      {[...Array(numberOfChildren).keys()].map((n) => (
        // eslint-disable-next-line react/jsx-key
        <span>•</span>
      ))}
    </div>
  </span>
);
export const Loading = Template.bind({});
Loading.args = {};
