export interface IStepsProps {
  setSteps: (steps: Steps) => void;
}

export type Steps = 'WalletAddress' | 'EnterNFTS' | 'ConfirmSwap' | 'Confirmed';
