import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Button = ({
  type,
  loading = false,
  message,
  onClick,
  htmlType,
  ...props
}: IButtonProps): React.ReactElement => {
  //   const [state, setState] = useState({ loading: false });
  return (
    <button
      onClick={onClick}
      className={`button ${type}`}
      type={htmlType}
      {...props}
    >
      {!loading ? message : <ClipLoader />}
    </button>
  );
};

interface IButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  onClick?: () => void;
  loading?: boolean;
  type: 'default' | 'primary' | 'text';
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  message: string;
}

export default Button;
