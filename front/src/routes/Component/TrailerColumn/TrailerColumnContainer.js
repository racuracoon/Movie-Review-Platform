import React, { useEffect, useState } from "react";
import TrailerColumnPresenter from "./TrailerColumnPresenter";

const TrailerColumnContainer = (props) => {
  const trailer = props.trailer;
  const trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
  const name = trailer.name;
  return(
    <TrailerColumnPresenter name={name} trailerUrl={trailerUrl}/>
  )
}

export default TrailerColumnContainer;