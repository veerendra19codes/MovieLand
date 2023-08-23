import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard.jsx";

import "./App.css";
import SearchIcon from "./search.svg";

//getting api key from .env file
const API_KEY =  process.env.REACT_APP_API_KEY;

//inserting api key into api url
const API_URL =  "http://www.omdbapi.com/?i=tt3896198&apikey="+API_KEY;

const App = () => {

    

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const searchMovies = async (title) => {
        try{
            const response = await fetch(`${API_URL}&s=${title}`);
            // const response = await axios.get(`${API_URL}&s=${title}`);
            const data = await response.json();
    
            setMovies(data.Search);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        searchMovies("Spiderman");
    }, []);

    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input 
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={() => searchMovies(searchTerm)}
                />
                <img 
                    src={SearchIcon}
                    alt="search"
                    onClick = {() => searchMovies(searchTerm)}
                /> 
            </div>

            {
                movies?.length >0 
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No Movies found</h2>
                    </div>
                    
                )
            }

        </div>
    );
}

export default App;