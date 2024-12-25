import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  buttonStyles?: string;
};

const Button: React.FC<ButtonProps> = ({ children, buttonStyles }) => {
  return (
    <button className={` border-none outline-none ${buttonStyles}`}>
      {children}
    </button>
  );
};

export default Button;
