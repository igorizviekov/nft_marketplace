import collections from './ERC721Collections.json';
import marketplace from './NFTMarketplace.json';

// address of a contract after its been deployed
export const collectionsAddress = '0x64f5219563e28EeBAAd91Ca8D31fa3b36621FD4f';

export const marketplaceAddress = '0x1757a98c1333B9dc8D408b194B2279b5AFDF70Cc';

export const CollectionsABI = collections.abi;
export const MarketplaceABI = marketplace.abi;

export const mockTokenURI =
  'https://ipfs.io/ipfs/QmRu5d6hJxpoyZgq9HyKSW5fz3AFvBgixaeFZhMvZow222';

export const mockCollectionURI =
  'https://ipfs.io/ipfs/QmaNfrXqMu8j2UdNDj881r3VnaXoAGrpDbJoDRJRXwfdaU';
