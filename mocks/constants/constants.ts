import collections from './ERC721Collections.json';
import marketplace from './NFTMarketplace.json';

// id of a contract after its been deployed
export const collectionsAddress = '0x2538a10b7fFb1B78c890c870FC152b10be121f04';

export const marketplaceAddress = '0x24432a08869578aAf4d1eadA12e1e78f171b1a2b';

export const CollectionsABI = collections.abi;
export const MarketplaceABI = marketplace.abi;

export const mockTokenURI =
  'https://ipfs.io/ipfs/QmRu5d6hJxpoyZgq9HyKSW5fz3AFvBgixaeFZhMvZow222';

export const mockCollectionURI =
  'https://ipfs.io/ipfs/QmaNfrXqMu8j2UdNDj881r3VnaXoAGrpDbJoDRJRXwfdaU';
