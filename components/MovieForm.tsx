import { FC } from 'react';
import { Movie } from '../models/Movie';
import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Textarea } from '@chakra-ui/react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as web3 from '@solana/web3.js';

const MOVIE_REVIEW_PROGRAM_ID = 'CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN'


export const MovieForm: FC = (): JSX.Element => {
    const [title, setTitle] = useState('')
    const [rating, setRating] = useState(0)
    const [message, setMessage] = useState('')
    const { publicKey, sendTransaction } = useWallet()
    const { connection } = useConnection();


    const handleSubmit = (e: any) => {
        e.preventDefault()
        const movie = new Movie(title, rating, message)
        handleTransactionSubmit(movie)
    }

    const handleTransactionSubmit = async (movie: Movie) => {
        if (!publicKey) {
            alert('Please connect your wallet!')
            return
        }

        const buffer = movie.serialize();
        const transaction = new web3.Transaction();

        const [pda] = await web3.PublicKey.findProgramAddress(
            [publicKey.toBuffer(), Buffer.from(movie.title)],
            new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID)
        )

        const instruction = new web3.TransactionInstruction({
            keys: [{
                pubkey: publicKey,
                isSigner: true,
                isWritable: false,
            },
            {
                pubkey: pda,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: web3.SystemProgram.programId,
                isSigner: false,
                isWritable: false
            }],
            programId: new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID),
            data: buffer
        })

        transaction.add(instruction)

        try {
            let txid = await sendTransaction(transaction, connection)
            console.log(`Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`)
        } catch (e) {
            alert(JSON.stringify(e))
        }
    }


    return (
        <Box
            p={4}
            display={{ md: "flex" }}
            maxWidth="32rem"
            borderWidth={1}
            margin={2}
            justifyContent="center"
        >
            <form className='flex flex-col items-start justify-center w-full' onSubmit={handleSubmit}>
                <div className='flex flex-col items-start justify-center p-2 gap-y-1 w-full'>
                    <label className='' htmlFor='title'>
                        Title
                    </label>
                    <input className="p-1 rounded-lg w-full text-black" type='text' id='title' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div className='flex flex-col items-start justify-center p-2 gap-y-1 w-full'>
                    <label className='' htmlFor='rating'>
                        Rating
                    </label>
                    <input className="p-1 rounded-lg w-full text-black" type='number' id='rating' placeholder='Rating' value={rating} onChange={(e) => setRating(parseInt(e.target.value))} required />
                </div>

                <div className='flex flex-col items-start justify-center p-2 gap-y-1 w-full'>
                    <label className='' htmlFor='message'>
                        Review
                    </label>
                    <textarea className="p-1 rounded-lg w-full text-black" id='message' placeholder='Review' value={message} onChange={(e) => setMessage(e.target.value)} required />
                </div>
                <div className='flex flex-col items-start justify-center p-2 gap-y-1 w-full'>
                    <button type='submit' className="p-1 w-full bg-white text-black rounded-lg hover:bg-slate-500">
                        Submit
                    </button>
                </div>

            </form>
        </Box>
    )
}

export default MovieForm;