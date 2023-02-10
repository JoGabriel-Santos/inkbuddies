import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Authentication from "./pages/Authentication"
import Navbar from "./components/Navbar";
import Friends from "./pages/Friends";
import Home from "./pages/Home";

function App() {

    return (
        <React.Fragment>
            <Navbar/>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={ Home }/>
                    <Route path="/signin" exact component={ Authentication }/>
                    <Route path="/signup" exact component={ Authentication }/>
                    <Route path="/friends" exact component={ Friends }/>
                </Switch>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;