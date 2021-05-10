import React from "react";
import "./css/Reset.css";
import "./css/App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import MoviesContainer from "./containers/MoviesContainer";

function App() {
    return (
        <div className="App">
            <Navbar />
            <Header />
            <MoviesContainer />
        </div>
    );
}

export default App;
