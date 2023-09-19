import collections from './ERC721Collections.json';
import marketplace from './NFTMarketplace.json';

// address of a contract after its been deployed
export const collectionsAddress = '0xde79380FBd39e08150adAA5C6c9dE3146f53029e';

export const marketplaceAddress = '0xbFD3c8A956AFB7a9754C951D03C9aDdA7EC5d638';

export const CollectionsABI = collections.abi;
export const MarketplaceABI = marketplace.abi;

export const mockTokenURI =
  'https://ipfs.io/ipfs/QmRu5d6hJxpoyZgq9HyKSW5fz3AFvBgixaeFZhMvZow222';

export const mockCollectionURI =
  'https://ipfs.io/ipfs/QmaNfrXqMu8j2UdNDj881r3VnaXoAGrpDbJoDRJRXwfdaU';
