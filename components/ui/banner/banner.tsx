import styles from './banner.styles.module.scss';
import { RiCopperCoinLine } from 'react-icons/ri';

export const Banner = () => {
  return (
    <div className="relative">
      <div
        className={[styles['container'], styles['container-bottom']].join(' ')}
      >
        <h1 className="font-poppins text-8xl  md:text-7xl  text-nft-red-violet text-semibold">
          Create
        </h1>
        <h1 className="absolute z-20 top-1/2 -translate-y-1/2 font-poppins text-8xl sm:text-7xl text-nft-red-violet text-semibold">
          Buy
        </h1>
        <h1 className="absolute z-20 bottom-0 font-poppins text-8xl md:text-7xl text-nft-red-violet text-semibold ">
          Sell NFTs
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
            <use xlinkHref="#layer" x="-40" y="-20" fill="#a1a1a1" />
            <use xlinkHref="#layer" x="0" y="-10" fill="#7a7a7a" />
            <use xlinkHref="#layer" x="-70" y="-4" fill="#525050" />
            <use xlinkHref="#layer" x="-50" y="7" fill="#222222" />
          </g>
        </svg>
      </div>
      <RiCopperCoinLine
        size={100}
        color="white"
        className="absolute z-20 right-10 sm:right-2  top-1/2 -translate-y-1/2"
      />
    </div>
  );
};
