import { ethers } from 'ethers';
import React, { useMemo } from 'react';
import { MarketplaceABI, marketplaceAddress } from '../../mocks/constants.mock';
import { getErrMessage } from '../useMintNFT';
import { toast } from 'react-toastify';

const isListed = async (tokenID: number) => {
  const marketplaceContract = useMemo(
    () => new ethers.Contract(marketplaceAddress, MarketplaceABI, provider),
    []
  );
  const provider = useMemo(
    () =>
      new ethers.providers.JsonRpcProvider(
        'https://json-rpc.evm.testnet.shimmer.network'
      ),
    []
  );
  try {
    const tx = await marketplaceContract.isTokenListed(tokenID);
    return tx;
  } catch (err) {
    console.log({ err });
    const message = getErrMessage(err);
    toast.error(message);
  }
};

export default isListed;
