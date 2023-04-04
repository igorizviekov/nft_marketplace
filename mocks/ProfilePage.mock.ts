export const MockNFTS: INFTObject[] = [
  {
    status: 'On Sale',
    imageUrl: '',
    name: 'Alien Worlds Biannce Mission #423',
    price: 1278,
    buttonLabel: 'Place Bid',
  },
  {
    status: 'On Sale',
    imageUrl: '',
    name: 'Alien Worlds Biannce Mission #423',
    price: 1278,
    buttonLabel: 'Place Bid',
  },
  {
    status: 'Created',
    imageUrl: '',
    name: 'Alien Worlds Biannce Mission #423',
    price: 1278,
    buttonLabel: 'Place Bid',
  },
  {
    status: 'Created',
    imageUrl: '',
    name: 'Alien Worlds Biannce Mission #423',
    price: 1278,
    buttonLabel: 'Place Bid',
  },
  {
    status: 'Owned',
    imageUrl: '',
    name: 'Alien Worlds Biannce Mission #423',
    price: 1278,
    buttonLabel: 'Place Bid',
  },
  {
    status: 'Owned',
    imageUrl: '',
    name: 'Alien Worlds Biannce Mission #423',
    price: 1278,
    buttonLabel: 'Place Bid',
  },
  {
    status: 'Liked',
    imageUrl: '',
    name: 'Alien Worlds Biannce Mission #423',
    price: 1278,
    buttonLabel: 'Place Bid',
  },
  {
    status: 'Liked',
    imageUrl: '',
    name: 'Alien Worlds Biannce Mission #423',
    price: 1278,
    buttonLabel: 'Place Bid',
  },
  {
    status: 'Activity',
    imageUrl: '',
    name: 'Alien Worlds Biannce Mission #423',
    price: 1278,
    buttonLabel: 'Place Bid',
  },
  {
    status: 'Activity',
    imageUrl: '',
    name: 'Alien Worlds Biannce Mission #423',
    price: 1278,
    buttonLabel: 'Place Bid',
  },
];

interface INFTObject {
  status: NFTStatus;
  imageUrl: string;
  name: string;
  price: number;
  buttonLabel: string;
}

type NFTStatus = 'On Sale' | 'Created' | 'Owned' | 'Liked' | 'Activity';
