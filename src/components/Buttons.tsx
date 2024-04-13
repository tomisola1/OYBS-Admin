import React from "react";

interface Props {
  className?: string | null;
  loading?: boolean | null;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  ref?: any;
  onClick?:
    | ((event?: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>)
    | undefined
    | any;
  children?: React.ReactNode | Array<React.ReactNode>;
  id?: string;
}

export const BtnPrimary: React.FC<Props> = ({ className, ...props }) => {
  return (
    <button
      className={`bg-primary flex items-center justify-center px-8 py-4 text-white border-none hover:bg-orange-600 rounded-[100px] ${className} `}
      {...props}
    >
      {props?.children}
    </button>
  );
};

export const Btn: React.FC<Props> = ({ className, ...props }) => {
  return (
    <button
      className={`bg-white flex items-center justify-center rounded-[100px] px-[1.13rem] py-[0.63rem] border border-solid border-[#d0d5dd] shadow-sm hover:bg-primary hover:text-white hover:border-primary ${className} `}
      {...props}
    >
      {props?.children}
    </button>
  );
};

export const BtnSec: React.FC<Props> = ({ className, ...props }) => {
    return (
      <button
        className={`bg-transparent flex items-center justify-center text-gray-500 rounded-lg px-[1.13rem] py-[0.63rem] border border-solid border-[#EAECF0] shadow-sm hover:bg-gray-200 ${className} `}
        {...props}
      >
        {props?.children}
      </button>
    );
  };

