import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import StarRating from "./StarRating";

function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRating
        maxRating={10}
        size={30}
        color="blue"
        onSetRating={setMovieRating}
      />
      <p>The movie has already been reated {movieRating} stars</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating
      maxRating={5}
      messages={["Terriable", "Bad", "Okay", "Good", "Amazing"]}
    />
    <StarRating maxRating={5} size={25} color="red" defaultRating={2} />

    <Test />
  </React.StrictMode>
);
