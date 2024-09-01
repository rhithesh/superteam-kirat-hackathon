"use client"
import { useState } from "react"
import Image from "next/image"

type Transaction = {
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

export default function Page() {
  const [walletAddress, setAddress] = useState("");
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!walletAddress) {
      console.error("Please enter a wallet address");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`https://api.helius.xyz/v0/addresses/${walletAddress}/transactions?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`);
      const transactions: Transaction[] = await response.json();
      console.log("Transactions for wallet:", walletAddress);
      console.log(transactions);
      setData(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="flex flex-col items-center justify-center mt-28">
            <div>
                <h2 className="text-sm text-gray-400 p-1">Wallet address :</h2>
                <input type="text" className="bg-[#0a0a0a] w-[250px] text-gray-400 text-sm px-5 py-2 border-[0.5px] border-gray-800 rounded-md" placeholder="Enter You Wallet Address" onChange={(e)=>{setAddress(e.target.value)}} />
             </div>
            <button className="bg-[#14f195] px-5 py-1 rounded-full m-5 text-sm" onClick={handleClick}>{loading ? "Loading..." : "Submit"}</button>
        </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-5 bg-green-500 p-5">
        {data.map((transaction, index) => (
          <div key={index} className="flex gap-5 items-center justify-center w-2/3 bg-[#0e0e0e] rounded-lg p-5 border-[0.5px] border-gray-800">
            <span className="text-white">{transaction.type==="Transfer" ? "Swap" : "Thank you for :"}</span>
            <span className="text-green-400">
              {transaction.tokenTransfers.length > 0
                ? `${transaction.tokenTransfers[0].tokenAmount} tokens`
                : transaction.nativeTransfers.length > 0
                ? `${transaction.nativeTransfers[0].amount / 1e9} SOL`
                : 'N/A'}
            </span>
            <span className="text-gray-400">{new Date(transaction.timestamp * 1000).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </>
  )
}