import React from "react";
import { ProTable, ProTableProps } from "@ant-design/pro-table";
import styles from "./styles.module.less";
import cs from "classnames";

export const MyProTable = (props: ProTableProps<any, any>) => {
  const { headerTitle, className, ...rest } = props;
  return (
    <ProTable
      {...rest}
      className={cs(styles.myProTable, className)}
      options={false}
      tableClassName={styles.tableBox}
      headerTitle={<div className={styles.headerTitle}>{headerTitle}</div>}
    />
  );
};
