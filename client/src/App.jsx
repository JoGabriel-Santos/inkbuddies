import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";

function App() {
    return (
        <React.Fragment>
            <Navbar/>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={ Home }/>
                </Switch>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;