import collections from './ERC721Collections.json';
import marketplace from './NFTMarketplace.json';

// address of a contract after its been deployed
export const collectionsAddress = '0x840748F7Fd3EA956E5f4c88001da5CC1ABCBc038';

export const marketplaceAddress = '0x1bEfE2d8417e22Da2E0432560ef9B2aB68Ab75Ad';

export const CollectionsABI = collections.abi;
export const MarketplaceABI = marketplace.abi;

export const mockTokenURI =
  'https://ipfs.io/ipfs/QmRu5d6hJxpoyZgq9HyKSW5fz3AFvBgixaeFZhMvZow222';

export const mockCollectionURI =
  'https://ipfs.io/ipfs/QmaNfrXqMu8j2UdNDj881r3VnaXoAGrpDbJoDRJRXwfdaU';
