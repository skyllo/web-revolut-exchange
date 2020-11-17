/* eslint-disable react/jsx-props-no-spreading */
import React, { ClipboardEvent, KeyboardEvent, ChangeEvent } from 'react';
import { toFixedDecimals } from '../utils/utils';
import { InputBasic } from './InputBasic';

type InputProps = React.ComponentPropsWithRef<'input'>;

export interface AmountInputProps extends InputProps {
  maxDecimalPlaces?: number;
  maxLength?: number;
}

export const AmountInput = React.forwardRef<HTMLInputElement, AmountInputProps>(
  (props: AmountInputProps, ref) => {
    const { maxDecimalPlaces = 2, maxLength = 10, onChange, ...leftProps } = props;

    const onChangeWrapper = (e: ChangeEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      // limit amount to a set amount of decimal places
      const hasMoreThanTwoDecimalPlaces = target.value.split('.')[1]?.length >= maxDecimalPlaces;
      if (hasMoreThanTwoDecimalPlaces) {
        target.value = toFixedDecimals(Number(target.value), false, maxDecimalPlaces).toString();
        e.preventDefault();
      }
      if (onChange) onChange(e);
    };

    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      const { key } = e;
      // prevent non-numeric characters, maintain length and prevent dots if zero decimal places
      const isNumericOrDot = /[\d.]/.test(key);
      const isDot = /\./.test(key);
      if (
        !isNumericOrDot ||
        target.value.length === maxLength ||
        (isDot && maxDecimalPlaces <= 0)
      ) {
        e.preventDefault();
      }
    };

    const onPaste = (e: ClipboardEvent) => {
      // prevent copy paste so maximum length is maintained
      e.preventDefault();
    };

    return (
      <InputBasic
        {...leftProps}
        type="number"
        ref={ref}
        onChange={onChangeWrapper}
        onKeyPress={onKeyPress}
        onPaste={onPaste}
      />
    );
  }
);
