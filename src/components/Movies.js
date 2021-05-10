import React from "react";
import Loading from "./Loading";
import MovieFull from "./MovieFull";

function Movies(props) {
    return (
        <div id="main-view" className="main-view">
            <div className="container">
                <div className="movie-view">
                    <div className="movie-list">
                        <div className="search">
                            <input
                                className="search-input"
                                ref={props.searchRef}
                                type="text"
                                placeholder="Search By Title..."
                            />
                            <button
                                onClick={props.getMoviesFromOMDB}
                                className="search-btn"
                            >
                                <span className="btn-icon btn-icon-search"></span>{" "}
                                Search
                            </button>
                        </div>

                        <div className="movie-container">
                            {props.searchRef.current.value ? (
                                <h2 className="heading">
                                    {props.totalResults} Results For "
                                    {props.searchRef.current.value.toUpperCase()}
                                    "
                                </h2>
                            ) : (
                                <h2 className="heading">
                                    Search To Nominate Movies
                                </h2>
                            )}
                            <div className="movie-grid">
                                {!props.loading && props.movies ? (
                                    props.moviesGenerator()
                                ) : props.searchRef.current.value &&
                                  props.loading ? (
                                    <Loading />
                                ) : (
                                    <></>
                                )}
                            </div>
                            {props.totalResultsLeft > 0 && (
                                <div className="load-more">
                                    <button
                                        onClick={props.loadMoreHandler}
                                        className="load-more-btn"
                                    >
                                        <span className="btn-icon btn-icon-load"></span>{" "}
                                        Load More
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="nomination-container">
                            <h2 className="heading">
                                Nominations
                                {props.nominations.length <= 0 && ": Empty"}
                            </h2>
                            {props.nominations.length > 0 && (
                                <>
                                    {props.nominationGenerator()}
                                    <p className="total-nominations">
                                        {props.nominations.length} out of 5
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div id="main-popup" className="overlay">
                <div className="popup">
                    <div className="content">
                        Congratulations!! You Nominated 5 Movies!
                    </div>
                    <button onClick={props.popupHandler} className="close">
                        &times;
                    </button>
                </div>
            </div>
            <MovieFull
                movieInfo={props.fullMovieInfo}
                fullMovieInfoHandler={props.fullMovieInfoHandler}
            />
        </div>
    );
}

export default Movies;
