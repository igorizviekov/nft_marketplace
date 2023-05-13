export interface IActivityBannerProps {
  img: string;
  name: string;
  transactionType: string;
  seller: string;
  buyer: string;
  time: Date;
  total: number;
}

type TransactionType = 'Listing' | 'Cancelled';

export interface ITooltipProps {
  time: Date;
}
