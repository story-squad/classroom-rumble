import React, { useEffect, useRef, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import blue_arrow from '../../../assets/img/blue_button_arrow.svg';
import white_arrow from '../../../assets/img/white_button_arrow.svg';

const Button = ({
  type = 'default',
  loading = false,
  onClick,
  htmlType,
  children,
  ...props
}: React.PropsWithChildren<IButtonProps>): React.ReactElement => {
  const [size, setSize] = useState<string>();
  const [color, setColor] = useState<string>();
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (button.current) {
      const style = window.getComputedStyle(button.current);
      if (style) {
        console.log('hit', style.fontSize, style.height);
        setSize((prev) => style.fontSize ?? style.height ?? prev);
        setColor((prev) => style.color ?? prev);
      }
    }
  }, [loading]);

  return (
    <button
      ref={button}
      onClick={onClick}
      className={`button ${type}`}
      type={htmlType}
      {...props}
    >
      {!loading ? (
        <>
          {children}
          {type === 'secondary-with-arrow' && (
            <img src={blue_arrow} alt="button arrow" />
          )}
          {type === 'primary-with-arrow' && (
            <img src={white_arrow} alt="button arrow" />
          )}
        </>
      ) : (
        <ClipLoader size={size} color={color} />
      )}
    </button>
  );
};

interface IButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  onClick?: () => void;
  loading?: boolean;
  type?:
    | 'default'
    | 'primary'
    | 'primary-with-arrow'
    | 'secondary'
    | 'secondary-with-arrow'
    | 'text';
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export default Button;
