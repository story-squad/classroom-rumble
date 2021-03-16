import React, { useEffect, useState } from 'react';

const Dots = (): React.ReactElement => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const dotTimer = setInterval(() => {
      setDots((cur) => {
        if (cur.length >= 3) return '';
        else return cur + '.';
      });
    }, 500);
    return () => {
      clearInterval(dotTimer);
    };
  }, []);

  return <span className="dots">{dots}</span>;
};

export default Dots;
