import { useTranslation } from "react-i18next";

export const ItemContainer = ({ item }) => {
  const { t } = useTranslation();
  return <div>{item.itemName}</div>;
};
