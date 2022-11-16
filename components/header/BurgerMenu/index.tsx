import { BtnOption, ButtonGroup } from '../../ui/ButtonGroup';
import { IoMdClose } from 'react-icons/io';
import styles from './burger.module.scss';

interface IBurgerMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  actions: BtnOption[];
  menuItems: any;
}

export const BurgerMenu = ({
  isOpen,
  onToggle,
  actions,
  menuItems,
}: IBurgerMenuProps) => (
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
    {isOpen && (
      <div className={styles['burger-menu__items']}>
        <div className="flex gap-5 flex-col p-5 dark:bg-nft-black-1 dark:px-5 dark:py-10 dark:gap-10">
          <ButtonGroup options={actions} />
          {menuItems}
        </div>
        <IoMdClose
          onClick={onToggle}
          size={35}
          color="lightgrey"
          className="absolute right-2 bottom-2 cursor-pointer"
        />
      </div>
    )}
  </div>
);
