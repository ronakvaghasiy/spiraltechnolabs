import { Table as MNtable } from "@mantine/core";
import React from "react";
import styles from "./Table.module.css";

interface TableProps {
  row: React.ReactNode | undefined;
  head: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ head, row }) => {
  return (
    <div className={styles.tableContainer}>
    <MNtable.ScrollContainer minWidth={100} style={{ width: "100%" }}>
      <MNtable withTableBorder highlightOnHover>
        <MNtable.Thead className={styles.tableHead}>{head}</MNtable.Thead>
        <MNtable.Tbody>{row}</MNtable.Tbody>
      </MNtable>
    </MNtable.ScrollContainer>
    </div>
  );
};
