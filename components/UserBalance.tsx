"use client"
import React, { useEffect, useState } from "react";
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const UserBalance: React.FC = () => {
    const { connection } = useConnection()
    const { publicKey, wallet } = useWallet();
    const [balance, setBalance] = useState<number | null>(null);

    const fetchBalance = async () => {
        if (publicKey) {
            const bal = await connection.getBalance(publicKey);
            console.log(bal)
            setBalance(bal);
        }
    }

    useEffect(() => {
        fetchBalance()
    }, [connection, publicKey])

    return (
        <div className={"mt-10 text-2xl font-bold"}>
            {(publicKey && balance) ? (<h1>Balance: {(balance / LAMPORTS_PER_SOL).toFixed(8)} SOL</h1>) : (<h1>Please Connect your Wallet to see your Balance :{')'}</h1>)}
        </div>
    )
}

export default UserBalance;