import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

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
      {!loading ? children : <ClipLoader />}
    </button>
  );
};

interface IButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  onClick?: () => void;
  loading?: boolean;
  type?: 'default' | 'primary' | 'secondary' | 'text';
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export default Button;
