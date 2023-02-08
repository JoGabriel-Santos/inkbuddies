import React from "react";

import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";

function App() {
    return (
        <React.Fragment>
            <Navbar/>

            <main>
                <Home/>
            </main>
        </React.Fragment>
    );
}

export default App;