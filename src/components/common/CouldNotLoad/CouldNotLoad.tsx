import React from 'react';
import ufo_cow from '../../../assets/img/alien.svg';
import { Button } from '../Button';
/**
 * Could Not Load will help us render consistent error messages throughout the application.
 * @param error The error the be loaded for the component, which in our case will be a message.
 * @example "Your are not currenly in a section".
 * @param className Class Name will allow us to style freely based on the could not load error.
 */

const CouldNotLoad = ({
  error,
  className,
}: CouldNotLoadProps): React.ReactElement => {
  console.log({ error });

  const goBack = async () => {
    try {
      await location.reload();
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <div className={`could-not-load${className ? ' ' + className : ''}`}>
      <img src={ufo_cow} />
      <div className="message">{error}&#128557;</div>
      <Button htmlType="button" onClick={goBack}>
        Go back!
      </Button>
       
    </div>
  );
};

interface CouldNotLoadProps {
  error: string;
  className?: string;
}

export default CouldNotLoad;
