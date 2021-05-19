import React, { useContext, useEffect } from 'react';
import CardContext from './CardContext';

const TopRight = ({
  children,
}: React.PropsWithChildren<unknown>): React.ReactElement => {
  const { setTopRightSize, topRightSize, headerRef, bodyRef } = useContext(
    CardContext,
  );

  useEffect(() => {
    if (!topRightSize) {
      let size = '16px';
      if (headerRef?.current) {
        const style = window.getComputedStyle(headerRef.current);
        size = style.fontSize ?? size;
      } else if (bodyRef?.current) {
        const style = window.getComputedStyle(bodyRef?.current);
        size = style.fontSize ?? size;
      }
      setTopRightSize((prev) => size ?? prev);
    }
  }, [topRightSize]);

  return (
    <div
      className="top-right"
      style={{
        fontSize: +(topRightSize?.slice(0, -2) ?? 16),
      }}
    >
      {children}
    </div>
  );
};

export default TopRight;
