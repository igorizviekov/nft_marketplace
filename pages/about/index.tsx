import { NextPage } from 'next';
import Link from 'next/link';

const About: NextPage = () => (
  <div className="flex justify-center sm:px-4 p-12 min-h-screen">
    <div className="w-full minmd:w-4/5">
      <div className="mt-24">
        <h2 className="font-poppins dark:text-white text-nft-black-1 text-4xl font-semibold my-2 sm:text-center">
          Our mission
        </h2>
        <p className="font-poppins dark:text-white text-nft-black-1">
          The main goal of this app - provide a safe space to trade Art.
        </p>
        <p className="font-poppins dark:text-white text-nft-black-1">
          2022 was tough, so buying NFTs here, you donate 20% of the transaction
          to support of Ukraine, which is divided equally between the following
          parties:
        </p>
        <p className="font-poppins dark:text-white text-nft-black-1">
          Creator of the Art
        </p>
        <p className="font-poppins dark:text-white text-nft-black-1">
          <Link href="https://helpingtoleave.org/en#donate" target="_blank">
            Helping to leave fund. Organization, which helps people evacuate
            from areas of military conflict.
          </Link>
          <Link
            href="https://savelife.in.ua/en/donate-en/#donate-army-crypto"
            target="_blank"
          >
            Come Back Alive. Fund, which purchases equipment that helps saving
            the lives of the military, including thermal imaging optics,
            quadcopters, cars, security, and intelligence systems.
          </Link>
          <Link
            href="https://savelife.in.ua/en/donate-en/#donate-army-crypto"
            target="_blank"
          >
            Charity foundation of Serhiy Prytula. Private fund, which helps
            Ukrainian army with high-precision equipment, drones and equipment
            for command posts.
          </Link>
        </p>
      </div>
    </div>
  </div>
);
export default About;
