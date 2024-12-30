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
    group relative flex  items-center gap-2 justify-center rounded-full border-2  border-[#656fe2]  from-[#070e41] to-[#263381] font-medium text-neutral-200   p-2
    overflow-hidden rounded-md 
    font-medium 
  `;

  if (isLink && href) {
    return (
      <Link href={href}>
        <div className={` ${buttonStyles}`}>{children}</div>
      </Link>
    );
  }

  return (
    <section>
      <button onClick={onClick} className={`${baseStyles} ${buttonStyles}`}>
        <span className="pl-4 font-figtree">{children}</span>
        <div className="relative mr-1 h-9 w-9  overflow-hidden rounded-full bg-white">
          <div className="absolute left-[-0.1em] top-[0.7em] grid h-full w-full place-content-center transition-all duration-200 group-hover:-translate-y-5 group-hover:translate-x-4 ">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 fill-black "
            >
              <path
                d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-1 h-5 w-5 -translate-x-4  fill-black"
            >
              <path
                d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      </button>
    </section>
  );
};

export default Button;
