"use client"
import { FC } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic';

const WalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);

export const AppBar: FC = () => {
    return (
        <div className={'h-[90px] p-5 flex flex-row justify-between'}>
            <Image alt="solanaLogo" src="/solanaLogo.png" height={30} width={200} />
            <WalletMultiButtonDynamic />
        </div>
    )
}