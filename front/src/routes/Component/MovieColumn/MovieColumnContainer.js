import React, { useEffect, useState } from "react";
import MovieColumnPresenter from "./MovieColumnPresenter";

const MovieColumnContainer = (props) => {
    const movie = props.movie;
    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const title = movie.title;
    const release = movie.release_date;
  return(
    <MovieColumnPresenter posterUrl={posterUrl} title={title} release={release}/>
  )
}

export default MovieColumnContainer;