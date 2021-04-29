import React from 'react';
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
  //   const [state, setState] = useState({ loading: false });
  return (
    <button
      onClick={onClick}
      className={`button ${type}`}
      type={htmlType}
      {...props}
    >
      {!loading ? (
        <>
          {children}
          {type === 'secondary-with-arrow' ? (
            <img src={blue_arrow} alt="button arrow" />
          ) : (
            <img src={white_arrow} alt="button arrow" />
          )}
        </>
      ) : (
        <ClipLoader />
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
