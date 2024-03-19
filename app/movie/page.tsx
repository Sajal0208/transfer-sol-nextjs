"use client"
import { NextPage } from "next";
import { Center, Box, Heading } from '@chakra-ui/react'
import { MovieList } from "@/components/MovieList";
import Head from "next/head";
import { AppBar } from "@/components/AppBar";
import MovieForm from "@/components/MovieForm";

const MoviePage: NextPage = (): JSX.Element => {
    return (
        <div className={""}>
            <Head>
                <title>Movie Reviews</title>
            </Head>
            <Center>
                <Box>
                    <div className="text-lg ">
                        Add a review
                    </div>
                    <MovieForm />
                    <div className="text-lg ">
                        Existing Reviews
                    </div>
                    <MovieList />
                </Box>
            </Center>
        </div>

    );
}

export default MoviePage;