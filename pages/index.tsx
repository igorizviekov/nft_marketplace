import { Actions, useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';
import { NftList } from '../components/nft-list';
import { TopSellers } from '../components/top-sellers';
import { Banner } from '../components/ui/banner/banner';
import { IStoreModel } from '../store/model/model.types';
import { connectWallet } from '../utils';

export default function Home() {
  const walletActions = useStoreActions(
    (actions: Actions<IStoreModel>) => actions.wallet
  );

  const setupCryptoWallet = async () => {
    if (!window.ethereum) {
      return console.log('wallet is not connected');
    }
    const wallet = await connectWallet('silent');
    const { isConnected } = wallet;
    walletActions.setIsWalletConnected(isConnected);
    if (isConnected) {
      walletActions.setActiveWallet(wallet.account);
    }
  };

  useEffect(() => {
    setupCryptoWallet();
  }, []);

  return (
    <div className="pt-32 sm:pt-26  w-9/12  sm:w-full m-auto">
      <Banner />
      <TopSellers />
      <NftList />
    </div>
  );
}
