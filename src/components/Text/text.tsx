import React, { useMemo } from 'react';

type Color = 'primary' | 'secondary' | 'white' | 'red' | string;
type Size = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
type Weight = 'normal' | 'bold' | 'semibold' | 'medium';
type Font = 'inter' | 'figtree';

const Text = ({
  children,
  color = 'secondary',
  className = '',
  size = 'md',
  weight = 'normal',
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
  weight?: Weight;
  onClick?: () => void;
  style?: React.CSSProperties;
  header?: boolean;
  subheader?: boolean;
  description?: boolean;
  font?: Font;
}) => {
  const variant = {
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      white: 'text-white',
      red: 'text-red',
    },
    size: {
      xs: 'text-[58px] max-desktop:text-[48px] font-semibold ',
      xl: 'text-[36px] max-desktop:text-[30px] font-semibold ',
      lg: 'text-[30px] max-desktop:text-[24px] font-normal',
      md: 'text-[22px] max-desktop:text-[18px] font-normal ',
      sm: 'text-[14px] max-desktop:text-[12px] font-normal ',
    },
    weight: {
      normal: 'font-normal',
      bold: 'font-bold',
      semibold: 'font-semibold',
      medium: 'font-medium',
    },

    font: {
      inter: 'font-inter',
      figtree: 'font-figtree',
    },
  };

  const isHexColor = (color: string) =>
    /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(color);

  const textColor = useMemo(() => {
    return (
      variant?.color?.[color as keyof typeof variant.color] ??
      (isHexColor(color) ? `text-[${color}]` : '')
    );
  }, [color]);

  return (
    <>
      {/* // modify tags for SEO specificity */}
      {header ? (
        <h1
          className={`${textColor} ${variant.font[font]} ${
            variant.weight[weight] ?? ''
          } ${variant.size[size] ?? ''} ${className}`}
          {...(onClick && { onClick })}
          style={style}
        >
          {children}
        </h1>
      ) : subheader ? (
        <h2
          className={`${textColor} ${variant.font[font]} ${
            variant.weight[weight] ?? ''
          } ${variant.size[size] ?? ''} ${className}`}
          {...(onClick && { onClick })}
          style={style}
        >
          {children}
        </h2>
      ) : description ? (
        <p
          className={`${textColor} ${variant.font[font]} ${
            variant.weight[weight] ?? ''
          } ${variant.size[size] ?? ''} ${className}`}
          {...(onClick && { onClick })}
          style={style}
        >
          {children}
        </p>
      ) : (
        <p
          className={`${textColor} ${variant.font[font]} ${
            variant.weight[weight] ?? ''
          } ${variant.size[size] ?? ''} ${className}`}
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
