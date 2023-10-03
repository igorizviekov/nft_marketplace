import collections from './ERC721Collections.json';
import marketplace from './NFTMarketplace.json';

// address of a contract after its been deployed
export const collectionsAddress = '0x43b9Ef43D415e84aD9964567002d648b11747A8f';

export const marketplaceAddress = '0xFCa5Bb3732185AE6AaFC65aD8C9A4fBFf21DbaaD';

export const CollectionsABI = collections.abi;
export const MarketplaceABI = marketplace.abi;

export const mockTokenURI =
  'https://ipfs.io/ipfs/QmRu5d6hJxpoyZgq9HyKSW5fz3AFvBgixaeFZhMvZow222';

export const mockCollectionURI =
  'https://ipfs.io/ipfs/QmaNfrXqMu8j2UdNDj881r3VnaXoAGrpDbJoDRJRXwfdaU';
