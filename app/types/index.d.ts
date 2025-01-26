export type Transaction = {
    description: string;
    type: string;
    signature: string;
    timestamp: number;
    tokenTransfers: Array<{
      tokenAmount: number;
      mint: string;
    }>;
    nativeTransfers: Array<{
      amount: number;
    }>;
  };
  