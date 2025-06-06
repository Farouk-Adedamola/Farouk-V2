import React, { useMemo } from 'react';

type Color = 'primary' | 'secondary' | 'white' | 'red';
type Size = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
type Font = 'inter' | 'figtree';

const Text = ({
  children,
  color = 'secondary',
  className = '',
  size = 'md',
  onClick,
  style,
  header = false,
  subheader = false,
  description = false,
  font = 'inter',
}: {
  children: React.ReactNode;
  color?: Color;
  className?: string;
  size?: Size;
  onClick?: () => void;
  style?: React.CSSProperties;
  header?: boolean;
  subheader?: boolean;
  description?: boolean;
  font?: Font;
}) => {
  const variant = useMemo(
    () => ({
      color: {
        primary: 'text-primary',
        secondary: 'text-secondary',
        white: 'text-white',
        red: 'text-red',
      },
      size: {
        xs: 'text-[58px] max-desktop:text-[48px] max-md:text-[40px] font-semibold',
        xl: 'text-[36px] max-desktop:text-[30px] font-semibold',
        lg: 'text-[30px] max-desktop:text-[24px] font-normal',
        md: 'text-[22px] max-desktop:text-[18px] font-normal',
        sm: 'text-[18px] max-desktop:text-[14px] font-normal',
      },
      font: {
        inter: 'font-inter',
        figtree: 'font-figtree',
      },
    }),
    []
  );

  const textColor = useMemo(() => {
    return variant?.color?.[color as keyof typeof variant.color];
  }, [color, variant]);

  return (
    <>
      {/* // modify tags for SEO specificity */}
      {header ? (
        <h1
          className={`${textColor} ${variant.font[font]} ${
            variant.size[size] ?? ''
          } ${className}`}
          {...(onClick && { onClick })}
          style={style}
        >
          {children}
        </h1>
      ) : subheader ? (
        <h2
          className={`${textColor} ${variant.font[font]}  ${
            variant.size[size] ?? ''
          } ${className}`}
          {...(onClick && { onClick })}
          style={style}
        >
          {children}
        </h2>
      ) : description ? (
        <p
          className={`${textColor} ${variant.font[font]}  ${
            variant.size[size] ?? ''
          } ${className}`}
          {...(onClick && { onClick })}
          style={style}
        >
          {children}
        </p>
      ) : (
        <p
          className={`${textColor} ${variant.font[font]}  ${
            variant.size[size] ?? ''
          } ${className}`}
          {...(onClick && { onClick })}
          style={style}
        >
          {children}
        </p>
      )}
    </>
  );
};

export default Text;
