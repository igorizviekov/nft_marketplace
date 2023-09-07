import collections from './ERC721Collections.json';
import marketplace from './NFTMarketplace.json';

// id of a contract after its been deployed
export const collectionsAddress = '0x3a622DB2db50f463dF562Dc5F341545A64C580fc';

export const marketplaceAddress = '0x6A47346e722937B60Df7a1149168c0E76DD6520f';

export const CollectionsABI = collections.abi;
export const MarketplaceABI = marketplace.abi;

export const mockTokenURI =
  'https://ipfs.io/ipfs/QmRu5d6hJxpoyZgq9HyKSW5fz3AFvBgixaeFZhMvZow222';

export const mockCollectionURI =
  'https://ipfs.io/ipfs/QmaNfrXqMu8j2UdNDj881r3VnaXoAGrpDbJoDRJRXwfdaU';
