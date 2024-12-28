import Link from 'next/link';
import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  buttonStyles?: string;
  onClick?: () => void;
  href?: string;
  isLink?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  buttonStyles,
  onClick,
  href,
  isLink,
}) => {
  const baseStyles = `
    group relative inline-flex py-4 items-center justify-center 
    overflow-hidden rounded-md border-2 
    bg-transparent px-6 py-2 font-medium transition-all duration-100 text-white
    hover:translate-x-1 hover:translate-y-1 border-lightTheme-primary
  `;

  if (isLink && href) {
    return (
      <Link href={href}>
        <div className={` ${buttonStyles}`}>{children}</div>
      </Link>
    );
  }

  return (
    <button className={`${baseStyles} ${buttonStyles}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
