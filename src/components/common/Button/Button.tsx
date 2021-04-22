import React, { useMemo } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Button = ({
  type,
  loading = false,
  message,
  onClick,
}: IButtonProps): React.ReactElement => {
  const buttonType = useMemo(() => {
    switch (type) {
      case 'primary':
        return 'primary';
      case 'text':
        return 'text';
      case 'default':
        return 'default';
    }
  }, [type]);
  //   const [state, setState] = useState({ loading: false });
  return (
    <div className="button">
      <button onClick={onClick} className={buttonType}>
        {!loading ? message : <ClipLoader />}
      </button>
    </div>
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
