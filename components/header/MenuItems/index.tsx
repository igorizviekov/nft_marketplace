import Link from 'next/link';

interface IMenuItemsProps {
  isMob: boolean;
  links: string[];
  active: string;
  setActiveTab: (_: string) => void;
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
        return '/feed';
      case 2:
        return '/my-nft';
      default:
        return '/';
    }
  };

  return (
    <ul className={`list-none flex flex-row ${isMob && 'flex-col h-full'}`}>
      {links.map((link, i) => (
        <li
          key={link + i}
          onClick={() => setActiveTab(link)}
          className={`
        flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3
        ${
          active === link
            ? 'dark:text-white text-nft-black-1'
            : 'dark:text-nft-gray-2 text-nft-gray-2'
        }
        `}
        >
          <Link href={i === 0 ? '/' : generateLink(i)}>{link}</Link>
        </li>
      ))}
    </ul>
  );
};
