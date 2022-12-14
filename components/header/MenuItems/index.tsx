import Link from 'next/link';
import { MenuTab } from '../../../store/model/ui/ui.types';

interface IMenuItemsProps {
  isMob: boolean;
  links: string[];
  active: string;
  setActiveTab: (_: MenuTab) => void;
}

export const MenuItems = ({
  isMob,
  links,
  active,
  setActiveTab,
}: IMenuItemsProps) => {
  const generateLink = (index: number) => {
    switch (index) {
      case 1:
        return '/listed';
      case 2:
        return '/my-nft';
      default:
        return '/';
    }
  };
  return (
    <ul
      className={`list-none flex flex-row sm:flex-col sm:gap-6 ${
        isMob && 'flex-col h-full'
      }`}
    >
      {links.map((link, i) => (
        <li
          key={link + i}
          onClick={() => setActiveTab(link as MenuTab)}
          className={`
        flex flex-row items-center font-poppins font-semibold text-base mx-3
  ${
    active === link
      ? 'text-nft-red-violet'
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
