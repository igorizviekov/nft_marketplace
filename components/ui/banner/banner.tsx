import styles from './banner.styles.module.scss';
import { RiCopperCoinLine } from 'react-icons/ri';
import Link from 'next/link';
import { useDeviceWidth } from '../../hooks/useDeviceDimensions';
import { useEffect, useState } from 'react';
export const Banner = () => {
  const deviceWidth = useDeviceWidth();
  const [waves, setWaves] = useState([-30, -10, 0]);

  useEffect(() => {
    if (deviceWidth > 768 && deviceWidth < 1024) {
      setWaves([-25, 0, 8]);
    }
    if (deviceWidth > 1024 && deviceWidth < 1280) {
      setWaves([-18, 0, 8]);
    }
    if (deviceWidth > 1280 && deviceWidth < 1536) {
      setWaves([-14, 7, 8]);
    }
    if (deviceWidth > 1536) {
      setWaves([-10, 7, 8]);
    }
  }, [deviceWidth]);

  return (
    <div className="relative sm:px-2">
      <div
        className={[styles['container'], styles['container-bottom']].join(' ')}
      >
        <h1 className="  font-poppins text-5xl sm:text-6xl text-white dark:text-nft-black-4 text-semibold">
          Buy
        </h1>
        <h1 className="absolute font-poppins z-20 top-1/2 -translate-y-1/2 text-6xl  md:text-6xl sm:ml:1 sm:text-5xl text-white dark:text-nft-black-4 text-semibold">
          Create
        </h1>
        <h1 className="absolute z-20 bottom-0 font-poppins text-6xl md:text-5xl sm:text-4xl  text-white dark:text-nft-black-4 text-semibold ">
          or sell your NFTs easily
        </h1>

        <svg
          viewBox="0 0 100 50"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="layer"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className={styles['parallax']}>
            <use xlinkHref="#layer" x="0" y={waves[0]} fill="#3390c9" />
            <use xlinkHref="#layer" x="-70" y={waves[1]} fill="#c1b042" />
            <use xlinkHref="#layer" x="-50" y={waves[2]} fill="#b8cd21" />
          </g>
        </svg>
      </div>
      <Link href="https://ethereum.org/en/nft/" target="_blank">
        <RiCopperCoinLine
          size={150}
          className="absolute  right-10 sm:right-2  top-1/2 -translate-y-1/2 fill-white dark:fill-nft-black-4 md:top-1/3 "
        />
      </Link>
    </div>
  );
};
