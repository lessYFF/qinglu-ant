import React from "react";
import { InputNumber, InputNumberProps } from "antd";

/**
 * 价格输入框，默认最大值： 999999，默认最小值：0；默认为正整数
 * @param props
 * @constructor
 */
export const PriceInput = (props: InputNumberProps) => {

  return (
    <InputNumber
      max={999999}
      min={0}
      precision={0}
      placeholder="正整数"
      {...props}
    />
  );
};
