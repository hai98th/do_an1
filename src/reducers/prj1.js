import {combineReducers} from "redux";
import {LOG_OUT} from "../constants/actionTypes";
import commonReducer from "./commonReducer";
import prj1Reducer from "../modules/prj1/prj1Reducer";
import loginReducer from '../modules/login/loginReducer';


const appReducer = combineReducers({
    ...commonReducer,
    prj1: prj1Reducer,
    login: loginReducer

});

const rootReducer = (state, action) => {
    if (action.type === LOG_OUT) {
        state = {};
    }

    return appReducer(state, action);
};

export default rootReducer;
