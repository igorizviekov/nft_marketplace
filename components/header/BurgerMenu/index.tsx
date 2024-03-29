import { AiOutlinePause } from 'react-icons/ai';
import styles from './burger.module.scss';
import { BackgroundBlur } from '../../ui/background';
import { useTheme } from 'next-themes';
import { FiMoon, FiSun } from 'react-icons/fi';
import stylesHeader from '../header.module.scss';
import { Actions, useStoreActions, useStoreState } from 'easy-peasy';
import { IStoreModel } from '../../../store/model/model.types';
import { MenuItems } from '../MenuItems';

interface IBurgerMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  controls: JSX.Element;
  links: string[];
}

export const BurgerMenu = ({
  isOpen,
  onToggle,
  controls,
  links,
}: IBurgerMenuProps) => {
  const { theme, setTheme } = useTheme();
  const state = useStoreState((state: IStoreModel) => state.ui);
  const actions = useStoreActions(
    (actions: Actions<IStoreModel>) => actions.ui
  );
  return (
    <>
      <BackgroundBlur isVisible={isOpen} onClick={onToggle} />
      <div className="hidden sm:flex ml-2">
        <div
          className={`${styles['burger-menu']} ${
            isOpen ? `text-nft-red-violet ${styles['burger-menu__open']}` : ''
          }`}
          onClick={onToggle}
        >
          <span
            className={`${styles['burger-menu__line']} ${styles['burger-menu__line1']} dark:bg-nft-yellow`}
          />
          <span
            className={`${styles['burger-menu__line']} ${styles['burger-menu__line2']} dark:bg-nft-yellow`}
          />
          <span
            className={`${styles['burger-menu__line']} ${styles['burger-menu__line3']} dark:bg-nft-yellow`}
          />
        </div>
        {isOpen && (
          <>
            <div className={styles['burger-menu__items']}>
              <div className="flex flex-col p-5  overflow-hidden px-5 py-10 gap-10">
                {controls}
                <div className={stylesHeader['header__theme']}>
                  <div className={stylesHeader['header__theme__toggle']}>
                    <input
                      type="checkbox"
                      className="checkbox"
                      id="checkbox"
                      checked={theme === 'dark'}
                      onChange={() =>
                        setTheme(theme === 'dark' ? 'light' : 'dark')
                      }
                    />
                    <label
                      htmlFor="checkbox"
                      className={[
                        'label',
                        'flexBetween',
                        stylesHeader['header__theme__toggle__label'],
                      ].join(' ')}
                    >
                      <FiSun color="yellow" size={13} />
                      <FiMoon color="white" size={12} />
                      <div
                        className={[
                          'ball',
                          stylesHeader['header__theme__toggle__label__ball'],
                        ].join(' ')}
                      />
                    </label>
                  </div>
                </div>
                <MenuItems
                  links={links}
                  active={state.tab}
                  setActiveTab={actions.toggleTab}
                />
              </div>

              <AiOutlinePause
                onClick={onToggle}
                size={55}
                color="#FFDD00"
                className="absolute right-2 bottom-20 cursor-pointer"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};
