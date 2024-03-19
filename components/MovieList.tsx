"use client"
import { Card } from './Card'
import { FC, useEffect, useState } from 'react'
import { Movie } from '../models/Movie'
import { useConnection } from '@solana/wallet-adapter-react'
import * as web3 from '@solana/web3.js'
import { MovieCoordinator } from '@/models/MovieCoordinator'
import { Button, Center, HStack, Input, Spacer } from '@chakra-ui/react'

const MOVIE_REVIEW_PROGRAM_ID = 'CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN'

export const MovieList: FC = () => {
    const [movies, setMovies] = useState<(Movie | null)[]>([])
    const { connection } = useConnection()
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')


    useEffect(() => {
        MovieCoordinator.fetchPage(connection, page, 10, search, search !== '').then((movies) => {
            setMovies(movies)
        })
    }, [page, search])


    return (
        <div>
            <Center>
                <input type="text" onChange={(e) => {
                    setSearch(e.target.value)
                }} className="p-1 rounded-lg w-full text-black" />
            </Center>
            {
                movies.map((movie, i) => {
                    return (
                        <Card key={i} movie={movie} />
                    )
                })
            }
            <Center>
                {page > 1 && <button className={'bg-white text-black m-1 p-1 rounded-full hover:cursor-pointer '} onClick={() => {
                    if (page > 1) setPage(page - 1)
                }}>
                    Prev
                </button>}
                {MovieCoordinator.accounts.length > page * 2 &&
                    <button className={'bg-white text-black m-1 p-1 rounded-full hover:cursor-pointer '} onClick={() => {
                        setPage(page + 1)
                    }}>
                        Next
                    </button>}
            </Center>
        </div>
    )
}