import { Spacer, Wrapper } from "../../components/Layout";
import { Item } from "../../components/Item";
import Link from "next/link";
import { Button } from "../../components/Button";
import { LoadingDots } from "../../components/LoadingDots";
import { useRouter } from "next/router";
import { useDonateItems } from "../../lib/donateItem";
import styles from "./Donate.module.css";
import { useTranslation } from "react-i18next";

export const Donate = ({ item }) => {
  const router = useRouter();
  const { data, isLoading, isError } = useDonateItems();
  const { cardId, category } = router.query;
  const { t } = useTranslation();

  return (
    <div className={styles.root}>
      <Link
        passHref
        href={{
          pathname: `/card/[cardId]/[category]/add`,
          query: {
            cardId: cardId,
            category: category,
          },
        }}
        as={`/card/[cardId]/[category]/add`}
      >
        <div className="flex text-gray-400 text-center px-1 py-1 m-3">
          <Button>{t("ITEM.TITLE")}</Button>
        </div>
      </Link>
      <div className="grid gap-4 h-96 sm:h-80 md:h-64 lg:h-48 xl:h-32 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {data ? (
          data.donateItems
            .filter((data) => data.category === category)
            .map((item, id) => <Item item={item} key={id}></Item>)
        ) : (
          <LoadingDots className={styles.loading} />
        )}
      </div>
    </div>
  );
};
