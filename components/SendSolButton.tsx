"use client"
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import React from 'react';
import * as web3 from '@solana/web3.js';

export const SendSolButton: React.FC = () => {
    const [txSig, setTxSig] = React.useState<string>("")
    const { connection } = useConnection()
    const { publicKey, sendTransaction } = useWallet()
    const link = () => {
        return txSig ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet` : ''
    }


    const sendSol = (e: any) => {
        e.preventDefault()
        if (!publicKey || !connection) {
            console.log('Please fill in all the fields')
            return;
        }

        try {
            const transaction = new web3.Transaction();
            const amount = e.target.amount.value
            const recipientPubKey = new web3.PublicKey(e.target.recipient.value)

            const sendSolInstruction = web3.SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: recipientPubKey,
                lamports: web3.LAMPORTS_PER_SOL * amount
            })

            transaction.add(sendSolInstruction)
            sendTransaction(transaction, connection).then(sig => {
                setTxSig(sig)
            }).catch(err => {
                console.log(err)
            })
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <div className="mt-10 flex flex-col justify-center items-center gap-y-4 text-xl">
            {publicKey ?
                <form onSubmit={sendSol} className='flex flex-col justify-center items-center gap-y-2 text-xl'>
                    <label htmlFor="amount">Amount (in SOL) to send:</label>
                    <input id="amount" type="text" className='p-1 rounded-lg text-black ' placeholder="e.g. 0.1" required />
                    <br />
                    <label htmlFor="recipient">Send SOL to:</label>
                    <input id="recipient" type="text" className='p-1 rounded-lg text-black ' placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA" required />
                    <button type="submit" className='mt-2 bg-white text-black py-1 px-12 rounded-lg'>Send</button>
                </form>
                : <p>Please connect your wallet to send SOL</p>
            }
            {
                txSig ? <a href={link()} target="_blank" rel="noreferrer">View transaction</a> : null
            }
        </div>
    )
}
