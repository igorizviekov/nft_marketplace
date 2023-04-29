import React from 'react';
import { IHorizontalScrollProps } from './HorizontalScroll.types';
import styles from './HorizontalScroll.module.scss';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import usePreventBodyScroll from '../../hooks/usePreventBodyScroll';
import Icon from '../ui/Icon/Icon';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const HorizontalScroll = ({ children }: IHorizontalScrollProps) => {
  const { disableScroll, enableScroll } = usePreventBodyScroll();

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
    <div
      // onMouseEnter={disableScroll}
      // onMouseLeave={enableScroll}
      className={styles.container}
    >
      <ScrollMenu
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
        // onWheel={onWheel}
      >
        {children}
      </ScrollMenu>
    </div>
  );
};

// function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
//   const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

//   if (isThouchpad) {
//     ev.stopPropagation();
//     return;
//   }

//   if (ev.deltaY > 0) {
//     apiObj.scrollNext();
//   } else if (ev.deltaY < 0) {
//     apiObj.scrollPrev();
//   }
// }

export default HorizontalScroll;
