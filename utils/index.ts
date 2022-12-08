export const randomId = (length: number): string => {
  let res = '';
  const chars = 'abcdefghijklmnopqrstuvwxyz123456789';
  for (let i = 0; i < length; i++) {
    return (res += chars.charAt(Math.floor(Math.random() * chars.length)));
  }
  return res;
};

interface IConnectWallet {
  isConnected: boolean;
  account: any;
}
export const connectWallet = async (
  mode: 'silent' | 'active'
): Promise<IConnectWallet> => {
  /**
   * is mode is active will display a popup to connect a wallet
   */
  const accounts = await window.ethereum.request({
    method: mode === 'silent' ? 'eth_accounts' : 'eth_requestAccounts',
  });
  if (accounts.length) {
    console.log('active accounts', accounts);
    return {
      isConnected: true,
      account: accounts[0],
    };
  } else {
    return {
      isConnected: false,
      account: null,
    };
  }
};
