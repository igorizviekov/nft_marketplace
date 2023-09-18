import collections from './ERC721Collections.json';
import marketplace from './NFTMarketplace.json';

// id of a contract after its been deployed
export const collectionsAddress = '0xce830DA8667097BB491A70da268b76a081211814';

export const marketplaceAddress = '0xD5bFeBDce5c91413E41cc7B24C8402c59A344f7c';

export const CollectionsABI = collections.abi;
export const MarketplaceABI = marketplace.abi;

export const mockTokenURI =
  'https://ipfs.io/ipfs/QmRu5d6hJxpoyZgq9HyKSW5fz3AFvBgixaeFZhMvZow222';

export const mockCollectionURI =
  'https://ipfs.io/ipfs/QmaNfrXqMu8j2UdNDj881r3VnaXoAGrpDbJoDRJRXwfdaU';
