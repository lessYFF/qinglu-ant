import React from "react";
import { Button, ButtonProps, Space } from "antd";
import cs from "classnames";
import styles from "./styles.module.less";

export const LinkButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      type="link"
      className={cs(styles.linkButton, props.className)}
    >
      {props.children}
    </Button>
  );
};

export interface LinkButtonGroupProps {
  direction?: "horizontal" | "vertical";
  children: React.ReactNode;
  size?: number
}

export const LinkButtonGroup = (props: LinkButtonGroupProps) => {
  const { children, direction, size } = props;
  return (
    <Space direction={direction} className={styles.linkButtonGroup} size={size}>
      {children}
    </Space>
  );
};
