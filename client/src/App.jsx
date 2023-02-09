import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Friends from "./Pages/Friends";

function App() {

    return (
        <React.Fragment>
            <Navbar/>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={ Home }/>
                    <Route path="/friends" exact component={ Friends }/>
                </Switch>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;