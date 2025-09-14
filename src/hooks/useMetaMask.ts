import { useState, useEffect } from 'react';

interface MetaMaskState {
  isConnected: boolean;
  account: string | null;
  isLoading: boolean;
  error: string | null;
}

export const useMetaMask = () => {
  const [state, setState] = useState<MetaMaskState>({
    isConnected: false,
    account: null,
    isLoading: false,
    error: null,
  });

  const connectWallet = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        setState(prev => ({
          ...prev,
          isConnected: true,
          account: accounts[0],
          isLoading: false,
        }));
        return accounts[0];
      } else {
        throw new Error('No accounts found');
      }
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Failed to connect to MetaMask',
      }));
      throw error;
    }
  };

  const disconnectWallet = () => {
    setState({
      isConnected: false,
      account: null,
      isLoading: false,
      error: null,
    });
  };

  // Mock transaction function for demo
  const sendTransaction = async (amount: string, to: string) => {
    if (!state.isConnected) {
      throw new Error('Wallet not connected');
    }

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      // Mock transaction - in production, this would interact with actual blockchain
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate transaction time
      
      // Mock transaction hash
      const txHash = '0x' + Math.random().toString(16).substr(2, 64);
      
      setState(prev => ({ ...prev, isLoading: false }));
      
      return {
        hash: txHash,
        amount,
        to,
        from: state.account,
      };
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Transaction failed',
      }));
      throw error;
    }
  };

  useEffect(() => {
    // Check if already connected
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts',
          });
          if (accounts.length > 0) {
            setState(prev => ({
              ...prev,
              isConnected: true,
              account: accounts[0],
            }));
          }
        } catch (error) {
          console.error('Error checking MetaMask connection:', error);
        }
      }
    };

    checkConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setState(prev => ({
            ...prev,
            isConnected: true,
            account: accounts[0],
          }));
        } else {
          disconnectWallet();
        }
      });
    }

    return () => {
      if (window.ethereum && window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', () => {});
      }
    };
  }, []);

  return {
    ...state,
    connectWallet,
    disconnectWallet,
    sendTransaction,
  };
};

// Extend Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}