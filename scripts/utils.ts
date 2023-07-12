import { ethers } from 'ethers';
import { useMemo } from 'react';
import { MarketplaceABI, marketplaceAddress } from '../mocks/constants.mock';

export const marketplaceContract = useMemo(
  () => new ethers.Contract(marketplaceAddress, MarketplaceABI, provider),
  []
);

export const provider = useMemo(
  () =>
    new ethers.providers.JsonRpcProvider(
      'https://json-rpc.evm.testnet.shimmer.network'
    ),
  []
);
