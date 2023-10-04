import collections from './ERC721Collections.json';
import marketplace from './NFTMarketplace.json';

// address of a contract after its been deployed
export const collectionsAddress = '0xB2ff9d5e60d68A52cea3cd041b32f1390A880365';

export const marketplaceAddress = '0xa68E430060f74F9821D2dC9A9E2CE3aF7d842EBe';

export const CollectionsABI = collections.abi;
export const MarketplaceABI = marketplace.abi;

export const mockTokenURI =
  'https://ipfs.io/ipfs/QmRu5d6hJxpoyZgq9HyKSW5fz3AFvBgixaeFZhMvZow222';

export const mockCollectionURI =
  'https://ipfs.io/ipfs/QmaNfrXqMu8j2UdNDj881r3VnaXoAGrpDbJoDRJRXwfdaU';
