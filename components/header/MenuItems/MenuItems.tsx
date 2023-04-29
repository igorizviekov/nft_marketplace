import Link from 'next/link';
import { MenuTab } from '../../../store/model/ui/ui.types';
import styles from './MenuItems.module.scss';
import classNames from 'classnames';
import BaseLink from '../../ui/Base/BaseLink/BaseLink';
interface IMenuItemsProps {
  links: string[];
  active: string;
  setActiveTab: (_: MenuTab) => void;
}

const MenuItems = ({ links, active, setActiveTab }: IMenuItemsProps) => {
  const generateLink = (index: number) => {
    switch (index) {
      case 0:
        return '/listed';
      case 1:
        return '/my-nft';
      default:
        return '/';
    }
  };
  return (
    <ul className={styles.list}>
      {links.map((link, i) => (
        <li key={link + i} onClick={() => setActiveTab(link as MenuTab)}>
          <BaseLink href={generateLink(i)} active={active}>
            {link}
          </BaseLink>
        </li>
      ))}
    </ul>
  );
};

export default MenuItems;
