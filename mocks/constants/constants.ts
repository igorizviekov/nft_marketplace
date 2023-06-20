import collections from './ERC721Collections.json';
import marketplace from './NFTMarketplace.json';

// id of a contract after its been deployed
export const collectionsAddress = '0xc6B407503dE64956Ad3cF5Ab112cA4f56AA13517';

export const marketplaceAddress = '0x3a622DB2db50f463dF562Dc5F341545A64C580fc';

export const CollectionsABI = collections.abi;
export const MarketplaceABI = marketplace.abi;

export const mockTokenURI =
  'https://ipfs.io/ipfs/QmRu5d6hJxpoyZgq9HyKSW5fz3AFvBgixaeFZhMvZow222';

export const mockCollectionURI =
  'https://ipfs.io/ipfs/QmaNfrXqMu8j2UdNDj881r3VnaXoAGrpDbJoDRJRXwfdaU';
