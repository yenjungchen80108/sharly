import { Button } from "../../components/Button";
import { Container, Spacer } from "../../components/Layout";
import Wrapper from "../../components/Layout/Wrapper";
import { Post } from "../../components/Post";
import { Text } from "../../components/Text";
import { useCards } from "../../lib/card";
import Link from "next/link";
import styles from "./PostList.module.css";
import { Card } from "../../components/Card";
import { LoadingDots } from "../../components/LoadingDots";

const CategoryList = () => {
  const { data } = useCards();
  if (!data) return <div></div>;

  return (
    <div className="flex justify-center bg-pink-50 overflow-scroll">
      {data ? (
        data.cards.map((card, id) => (
          <Link
            key={card._id}
            href={{
              pathname: `/card/${card._id}`,
              query: {
                // cardId: card._id,
                category: card.category,
              },
            }}
            passHref
          >
            <div className="flex text-gray-400 text-center px-1 py-1 m-3 cursor-pointer">
              <Card className={styles.post} card={card} key={card._id}></Card>
            </div>
          </Link>
        ))
      ) : (
        <LoadingDots className={styles.loading} />
      )}
    </div>
  );
};

export default CategoryList;
