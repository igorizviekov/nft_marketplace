import { ImInstagram } from 'react-icons/im';
import { TiSocialGithub } from 'react-icons/ti';
import { FaLinkedinIn, FaTwitterSquare } from 'react-icons/fa';
import Link from 'next/link';

export const Footer = () => {
  const socialIconClasses =
    'hover:text-nft-red-violet fill-nft-dark-1 dark:fill-white my-1 sm:my-5 cursor-pointer mx-5   hover:dark:fill-nft-yellow';

  return (
    <footer className="flexCenter flex-col sm:py-8 py-10 px-5bg-nft-black-1 shadow-toTop">
      <div className="flexCenter w-full mt-5 sm:px-5 px=16">
        <div className="flexBetween flex-row w-full minmd:w-4/5 sm:flex-col mt-7">
          <p className="font-poppins dark:text-white text-nft-black-1 text-bold text-base sm:mb-10">
            <strong>
              <Link
                href="https://igorizviekov.com/"
                target="_blank"
                className={socialIconClasses}
              >
                crypto_basset
              </Link>
            </strong>
          </p>
          <Link href="https://www.instagram.com/igorizviekov/" target="_blank">
            <ImInstagram className={socialIconClasses} size={30} />
          </Link>
          <Link href="https://twitter.com/IIzviekov/" target="_blank">
            <FaTwitterSquare className={socialIconClasses} size={30} />
          </Link>
          <Link href="https://github.com/igorizviekov" target="_blank">
            <TiSocialGithub className={socialIconClasses} size={50} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/igorizviekov/"
            target="_blank"
          >
            <FaLinkedinIn className={socialIconClasses} size={30} />
          </Link>
        </div>
      </div>
    </footer>
  );
};
