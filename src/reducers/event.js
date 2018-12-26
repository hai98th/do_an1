import { combineReducers } from "redux";

import { LOG_OUT } from "../constants/actionTypes";
import commonReducer from "./commonReducer";
import eventReducer from "../modules/event/reducers/eventReducer";

const appReducer = combineReducers({
    ...commonReducer,
    event: eventReducer,
});

const rootReducer = (state, action) => {
    if (action.type === LOG_OUT) {
        state = {};
    }

    return appReducer(state, action);
};

export default rootReducer;
