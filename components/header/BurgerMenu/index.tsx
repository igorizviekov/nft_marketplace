import styles from './burger.module.scss';

interface IBurgerMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  content: JSX.Element | JSX.Element[];
}

export const BurgerMenu = ({ content, isOpen, onToggle }: IBurgerMenuProps) => (
  <div className="hidden md:flex ml-2">
    <div
      className={`${styles['burger-menu']} ${
        isOpen ? styles['burger-menu__open'] : ''
      }`}
      onClick={onToggle}
    >
      <span
        className={`${styles['burger-menu__line']} ${styles['burger-menu__line1']}`}
      />
      <span
        className={`${styles['burger-menu__line']} ${styles['burger-menu__line2']}`}
      />
      <span
        className={`${styles['burger-menu__line']} ${styles['burger-menu__line3']}`}
      />
    </div>
    {isOpen && <div className={styles['burger-menu__items']}>{content}</div>}
  </div>
);
