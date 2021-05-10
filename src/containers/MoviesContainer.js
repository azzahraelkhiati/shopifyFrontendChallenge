import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";

// Import Movie component
import Movies from "../components/Movies";

function MoviesContainer() {
    const [response, setResponse] = useState([]);
    const [movies, setMovies] = useState([]);
    const [fullMovieInfo, setFullMovieInfo] = useState([]);
    const [nominations, setNominations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [totalResultsLeft, setTotalResultsLeft] = useState(0);

    const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

    // Get nomination list from local storage on mount (if exist)
    useEffect(() => {
        if (localStorage.getItem("nominatedMovies") !== null) {
            setNominations(JSON.parse(localStorage.getItem("nominatedMovies")));
        }
    }, []);

    // Set nomination list in local storage
    useEffect(() => {
        localStorage.setItem("nominatedMovies", JSON.stringify(nominations));
    }, [nominations]);

    const searchRef = useRef("");

    // Fetch the searched movies from OMDB database
    const getMoviesFromOMDB = async () => {
        setLoading(true);
        await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&type=movie&s=${searchRef.current.value}`
        )
            .then((response) => response.json())
            .then((data) => {
                // Set movies in state
                setResponse(data);
                setMovies(data.Search);
                setTotalResults(data.totalResults);
                setTotalResultsLeft(parseInt(data.totalResults) - 10);
            })
            .catch((error) => {
                console.log(error);
            });
        setLoading(false);
    };

    // Generate searched movies list
    const moviesGenerator = () =>
        movies.map((movie, index) => (
            <div key={`${movie.imdbID}${index}`} className="movie">
                <div
                    onClick={() => fullMovieInfoFetchHandler(movie.imdbID)}
                    className="movie-detail"
                >
                    <div className="movie-poster">
                        <img src={movie.Poster} alt={movie.Title} />
                    </div>
                    <div className="movie-info">
                        <p className="movie-title">{movie.Title}</p>
                        <p className="movie-year">Released: {movie.Year}</p>
                        <p className="movie-type">Type: {movie.Type}</p>
                    </div>
                </div>
                <button
                    disabled={isNominationExist(movie)}
                    onClick={() => addNominationHandler(movie)}
                    className="nomination-btn"
                >
                    <span className="btn-icon btn-icon-nominate"></span>{" "}
                    Nominate
                </button>
            </div>
        ));

    // Generate nominations list
    const nominationGenerator = () =>
        nominations.map((movie, index) => (
            <div
                key={`${index}${movie.imdbID}${index}`}
                data-key={`${index}${movie.imdbID}${index}`}
                className="movie nomination-card-container"
            >
                <div className="nomination-card">
                    <div className="nomination-front">
                        <div
                            onClick={() =>
                                fullMovieInfoFetchHandler(movie.imdbID)
                            }
                            className="movie-detail"
                        >
                            <div className="movie-poster">
                                <img src={movie.Poster} alt={movie.Title} />
                            </div>
                            <div className="movie-info">
                                <p className="movie-title">{movie.Title}</p>
                                <p className="movie-year">
                                    Released: {movie.Year}
                                </p>
                                <p className="movie-type">Type: {movie.Type}</p>
                            </div>
                        </div>
                        <button
                            onClick={() =>
                                confirmRemoveHandler(
                                    `${index}${movie.imdbID}${index}`
                                )
                            }
                            className="remove-nomination-btn nomination-btn"
                        >
                            <span className="btn-icon btn-icon-remove"></span>{" "}
                            Remove
                        </button>
                    </div>
                    <div className="nomination-back">
                        <div className="nomination-back-content">
                            <p className="heading">Are you sure?</p>
                            <button
                                onClick={() =>
                                    confirmRemoveHandler(
                                        `${index}${movie.imdbID}${index}`
                                    )
                                }
                                className="remove-confirm-no"
                            >
                                No
                            </button>
                            <button
                                onClick={() => removeNominationHandler(movie)}
                                className="remove-confirm-yes"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ));

    // Add movie to nomination list
    // If nomination list contains less than 5 movies
    // and movies doesn't exist in nomination list
    const addNominationHandler = (movie) => {
        if (nominations.length < 5 && !isNominationExist(movie)) {
            // Set Nominations in state
            setNominations((prev) => [...prev, movie]);
            if (nominations.length >= 4) {
                popupHandler();
                confettiFireworksHandler();
                confettiPrideHandler();
            }
        }
    };

    // Fireworks confetti
    const confettiFireworksHandler = () => {
        let duration = 15 * 1000;
        let animationEnd = Date.now() + duration;
        let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        let interval = setInterval(function () {
            let timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            let particleCount = 50 * (timeLeft / duration);
            confetti(
                Object.assign({}, defaults, {
                    particleCount,
                    origin: {
                        x: randomInRange(0.1, 0.3),
                        y: Math.random() - 0.2,
                    },
                })
            );
            confetti(
                Object.assign({}, defaults, {
                    particleCount,
                    origin: {
                        x: randomInRange(0.7, 0.9),
                        y: Math.random() - 0.2,
                    },
                })
            );
        }, 250);
    };

    // Pride confetti
    const confettiPrideHandler = () => {
        let end = Date.now() + 15 * 1000;

        // go Buckeyes!
        let colors = ["#bb0000", "#ffffff"];

        (function frame() {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors,
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors,
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    };

    // Handle popup
    const popupHandler = () => {
        document.querySelector(".overlay").classList.toggle("show");
        document.body.classList.toggle("noscroll");
    };

    // Flip nomination card to confirm remove
    const confirmRemoveHandler = (data) => {
        const card = document.body.querySelector(
            `.nomination-card-container[data-key="${data}"]`
        );
        card.classList.toggle("flip");
    };

    // Remove nomination from nomination list
    const removeNominationHandler = (movie) => {
        // Remove nomination from state
        setNominations((prev) => prev.filter((item) => item !== movie));
    };

    // Checks if movie exist in nomination list
    const isNominationExist = (movie) =>
        nominations.some((nomination) => nomination.imdbID === movie.imdbID);

    // Load more pages
    const loadMoreHandler = async () => {
        await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&type=movie&s=${
                searchRef.current.value
            }&page=${page + 1}`
        )
            .then((response) => response.json())
            .then((data) => {
                // Set movies in state
                setMovies((prev) => [...prev, ...data.Search]);
                setTotalResultsLeft((prev) => prev - 10);
            })
            .catch((error) => {
                console.log(error);
            });

        setPage((prev) => prev + 1);
    };

    const fullMovieInfoFetchHandler = async (movieID) => {
        await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieID}&plot=full`
        )
            .then((response) => response.json())
            .then((data) => {
                // Set full movies info in state
                setFullMovieInfo(data);
            })
            .catch((error) => {
                console.log(error);
            });

        fullMovieInfoHandler();
    };

    const fullMovieInfoHandler = () => {
        document.body
            .querySelector(".full-movie-container")
            .classList.toggle("show");
        document.body.classList.toggle("noscroll");
    };

    return (
        <Movies
            response={response}
            movies={movies}
            nominations={nominations}
            loading={loading}
            totalResults={totalResults}
            totalResultsLeft={totalResultsLeft}
            searchRef={searchRef}
            getMoviesFromOMDB={getMoviesFromOMDB}
            moviesGenerator={moviesGenerator}
            nominationGenerator={nominationGenerator}
            addNominationHandler={addNominationHandler}
            removeNominationHandler={removeNominationHandler}
            loadMoreHandler={loadMoreHandler}
            popupHandler={popupHandler}
            fullMovieInfo={fullMovieInfo}
            fullMovieInfoHandler={fullMovieInfoHandler}
        />
    );
}

export default MoviesContainer;
