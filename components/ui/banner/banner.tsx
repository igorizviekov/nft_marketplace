import styles from './banner.styles.module.scss';

export const Banner = () => {
  return (
    <div
      className={[styles['container'], styles['container-bottom']].join(' ')}
    >
      <h1 className="font-poppins text-8xl  md:text-8xl  text-white text-semibold">
        Create,
      </h1>
      <h1 className="absolute z-20 top-1/2 -translate-y-1/2 font-poppins text-7xl sm:text-9xl text-white text-semibold">
        Buy
      </h1>
      <h1 className="absolute z-20 bottom-0 font-poppins text-7xl md:text-5xl text-white text-semibold">
        and sell NFTs
      </h1>
      <svg
        viewBox="0 0 100 50"
        preserveAspectRatio="none"
        shape-rendering="auto"
      >
        <defs>
          <path
            id="layer"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className={styles['parallax']}>
          <use xlinkHref="#layer" x="-40" y="-20" fill="#b92990" />
          <use xlinkHref="#layer" x="0" y="-10" fill="#fc02b5" />
          <use xlinkHref="#layer" x="-70" y="-4" fill="#db49b1" />
          <use xlinkHref="#layer" x="-50" y="7" fill="#da18a3" />
        </g>
      </svg>
    </div>
  );
};
