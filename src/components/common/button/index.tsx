import React, { ReactNode } from 'react';
import cx from 'classnames';
import Button from '@mui/material/Button';
import Spinner from '../spinner';

interface ITextButton {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: any;
  onClick?: any;
  isLoading?: boolean;
  style?: any;
  color?: any;
  dataTestid?: string;
}

export default function TextButton({
  children,
  className = '',
  disabled = false,
  type,
  onClick,
  isLoading = false,
  style,
  color,
  dataTestid = '',
}: ITextButton) {
  const textButtonClasses = cx({
    [className]: className,
  });

  return (
    <Button
      className={textButtonClasses}
      disabled={disabled}
      id='text-button'
      onClick={onClick}
      type={type}
      style={style}
      color={color}
      data-testid={dataTestid}
    >
      {isLoading ? (
        <Spinner />
      ) : children}
    </Button>
  );
}
