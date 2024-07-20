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
    <div className="h-full bg-pink-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {data ? (
          data.cards.map((card, id) => (
            <Link
              key={card._id}
              href={{
                pathname: `/card/${card._id}`,
                query: {
                  category: card.category,
                },
              }}
              passHref
            >
              <div className="text-gray-400 text-center px-1 py-1 m-3 cursor-pointer">
                <Card className={styles.post} card={card} key={card._id}></Card>
              </div>
            </Link>
          ))
        ) : (
          <LoadingDots className={styles.loading} />
        )}
      </div>
    </div>
  );
};

export default CategoryList;
