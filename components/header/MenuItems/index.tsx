import Link from 'next/link';
import { MenuTab } from '../../../store/model/ui/ui.types';

interface IMenuItemsProps {
  links: string[];
  active: string;
  setActiveTab: (_: MenuTab) => void;
}

export const MenuItems = ({ links, active, setActiveTab }: IMenuItemsProps) => {
  const generateLink = (index: number) => {
    switch (index) {
      case 1:
        return '/listed';
      case 2:
        return '/my-nft';
      case 3:
        return '/about';
      default:
        return '/';
    }
  };
  return (
    <ul className="list-none flex gap-8 flex-row sm:flex-col sm:gap-6 sm:items-center">
      {links.map((link, i) => (
        <li
          key={link + i}
          onClick={() => setActiveTab(link as MenuTab)}
          className={`
        flex flex-row items-center font-poppins font-semibold text-base mx-3 hover:text-nft-red-violet transition-colors
  ${
    active === link
      ? 'dark:text-nft-yellow text-nft-red-violet'
      : 'text-nft-black-1 dark:text-white dark:hover:text-nft-gray-1 hover:text-nft-dark-1'
  }
        `}
        >
          <Link href={i === 0 ? '/' : generateLink(i)}>{link}</Link>
        </li>
      ))}
    </ul>
  );
};
