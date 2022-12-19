import { BtnOption, ButtonGroup } from '../../ui/ButtonGroup';
import { AiOutlinePause } from 'react-icons/ai';
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
        isOpen ? `text-nft-red-violet ${styles['burger-menu__open']}` : ''
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
        <div className="flex flex-col p-5  overflow-hidden px-5 py-10 gap-10">
          <ButtonGroup options={actions} />
          {menuItems}
        </div>
        <AiOutlinePause
          onClick={onToggle}
          size={55}
          color="#FFDD00"
          className="absolute right-2 bottom-2 cursor-pointer"
        />
      </div>
    )}
  </div>
);
