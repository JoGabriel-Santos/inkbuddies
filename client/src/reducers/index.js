import { combineReducers } from "redux";

import users from "./users";
import penpals from "./penpals"

export const reducers = combineReducers({ users, penpals });