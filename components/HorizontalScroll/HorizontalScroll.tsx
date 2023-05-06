import React from 'react';
import { IHorizontalScrollProps } from './HorizontalScroll.types';
import styles from './HorizontalScroll.module.scss';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import Icon from '../ui/Icon/Icon';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
const HorizontalScroll = ({ children }: IHorizontalScrollProps) => {
  function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } =
      React.useContext(VisibilityContext);

    return (
      <button
        className={styles.leftArrow}
        disabled={isFirstItemVisible}
        style={{ opacity: isFirstItemVisible ? 0 : 1 }}
        onClick={() => scrollPrev()}
      >
        <Icon icon={<FaChevronLeft className={styles.icon} />} />
      </button>
    );
  }

  function RightArrow() {
    const { isLastItemVisible, scrollNext } =
      React.useContext(VisibilityContext);

    return (
      <button
        className={styles.rightArrow}
        disabled={isLastItemVisible}
        style={{ opacity: isLastItemVisible ? 0 : 1 }}
        onClick={() => scrollNext()}
      >
        <Icon icon={<FaChevronRight className={styles.icon} />} />
      </button>
    );
  }

  return (
    <div className={styles.container}>
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {children}
      </ScrollMenu>
    </div>
  );
};

export default HorizontalScroll;
