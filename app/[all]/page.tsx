"use client"
import { useEffect, useState } from "react";
import { Transaction } from "../types/index";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{ all: string }>();

  const [data, setData] = useState<Transaction[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const walletAddress = params.all;
        const response = await fetch(
          `https://api.helius.xyz/v0/addresses/${walletAddress}/transactions?api-key=eda96028-2abb-4f07-9ac9-50b28d3fd10e`
        );
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const transactions: Transaction[] = await response.json();
        setData(transactions);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    }

    fetchData();
  }, [params]);

  return (
    <>
    <div className=" !bg-green-600  ">
        <div className=" mx-auto flex justify-center flex-col items-center gap-5 pt-10  overflow-scroll  ">
      {data?.map((transaction, index) => (
        <div
          key={index}
          className="flex gap-5 items-center justify-center w-2/3 bg-[#0e0e0e] rounded-lg p-5 border-[0.5px] border-gray-800"
        >
          <span className="text-white">
            {transaction.type === "Transfer" ? "Swap" : "Thank you for:"}
          </span>
          <span className="text-green-400">
            {transaction.tokenTransfers.length > 0
              ? `${transaction.tokenTransfers[0].tokenAmount} tokens`
              : transaction.nativeTransfers.length > 0
              ? `${transaction.nativeTransfers[0].amount / 1e9} SOL`
              : "N/A"}
          </span>
        </div>
      ))}
      </div>
      </div>
    </>
  );
}
