import collections from './ERC721Collections.json';
import marketplace from './NFTMarketplace.json';

// id of a contract after its been deployed
export const collectionsAddress = '0xf4B146FbA71F41E0592668ffbF264F1D186b2Ca8';

export const marketplaceAddress = '0x172076E0166D1F9Cc711C77Adf8488051744980C';

export const CollectionsABI = collections.abi;
export const MarketplaceABI = marketplace.abi;

export const mockTokenURI =
  'https://ipfs.io/ipfs/QmRu5d6hJxpoyZgq9HyKSW5fz3AFvBgixaeFZhMvZow222';

export const mockCollectionURI =
  'https://ipfs.io/ipfs/QmaNfrXqMu8j2UdNDj881r3VnaXoAGrpDbJoDRJRXwfdaU';
