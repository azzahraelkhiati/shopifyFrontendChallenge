import React from "react";
import "../css/MovieFull.css";
import star from "../assets/icons/star.svg";

function MovieFull(props) {
    return (
        <div className="full-movie-container">
            <div className="full-movie">
                <div className="full-movie-detail">
                    <div className="full-movie-main-detail">
                        <div className="full-movie-poster">
                            <img
                                src={props.movieInfo.Poster}
                                alt={props.movieInfo.Title}
                            />
                        </div>
                        <div className="full-movie-info">
                            <p className="movie-title">
                                {props.movieInfo.Title}
                            </p>
                            <p className="movie-year">
                                Released: {props.movieInfo.Year}
                            </p>
                            <p className="movie-type">
                                Type: {props.movieInfo.Type}
                            </p>
                        </div>
                    </div>
                    <div className="movie-extra-info">
                        <div>
                            <h4>Plot</h4>
                            <p>{props.movieInfo.Plot}</p>
                        </div>
                        <div>
                            <h4>Genre</h4>
                            <p>{props.movieInfo.Genre}</p>
                        </div>
                        <div>
                            <h4>Director</h4>
                            <p>{props.movieInfo.Director}</p>
                        </div>
                        <div>
                            <h4>Actors</h4>
                            <p>{props.movieInfo.Actors}</p>
                        </div>
                        <div>
                            <h4>IMDB Rating</h4>
                            <p>
                                <img
                                    src={star}
                                    alt="Star"
                                    className="rating-star"
                                />
                                {props.movieInfo.imdbRating} (
                                {props.movieInfo.imdbVotes})
                            </p>
                        </div>
                        <div>
                            <h4>Runtime</h4>
                            <p>{props.movieInfo.Runtime}</p>
                        </div>
                        <div>
                            <h4>Rated</h4>
                            <p>{props.movieInfo.Rated}</p>
                        </div>
                        <div>
                            <h4>Date Released</h4>
                            <p>{props.movieInfo.Released}</p>
                        </div>
                        <div>
                            <h4>Country(Language)</h4>
                            <p>{props.movieInfo.Language}</p>
                        </div>
                        <div>
                            <h4>Production</h4>
                            <p>{props.movieInfo.Production}</p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={props.fullMovieInfoHandler}
                    className="close-nomination-btn nomination-btn"
                >
                    <span className="btn-icon btn-icon-close"></span> Close
                </button>
            </div>
        </div>
    );
}

export default MovieFull;
