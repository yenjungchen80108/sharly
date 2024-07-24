import React from "react";
import { useTable } from "react-table";
import styles from "./CartDetail.module.css";
import { useTranslation } from "react-i18next";

const CartDetail = ({ data }) => {
  const { t } = useTranslation();
  const columns = React.useMemo(
    () => [
      {
        Header: t("CART.TABLE.COL_1"),
        accessor: "category",
      },
      {
        Header: t("CART.TABLE.COL_2"),
        accessor: "quantity",
      },
    ],
    [t]
  );

  const totalQuantity = data
    .map((row) => parseInt(row.quantity.replace("x ", "")))
    .reduce((sum, quantity) => sum + quantity, 0);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      <table {...getTableProps()} className={styles.tableBody}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <th
                  key={i}
                  {...column.getHeaderProps()}
                  className={styles.tableHeader}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={i} {...row.getRowProps()}>
                {row.cells.map((cell, i) => {
                  return (
                    <td
                      key={i}
                      {...cell.getCellProps()}
                      className={styles.tableRow}
                    >
                      {cell.render("Cell")}
                      <div className={styles.hrLine} />
                    </td>
                  );
                })}
              </tr>
            );
          })}
          <tr>
            <td className={styles.tableBottom}>{t("CART.TABLE.COL_LAST")}</td>
            <td className={styles.tableBottom}>x {totalQuantity}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CartDetail;
