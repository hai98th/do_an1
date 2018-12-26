import {combineReducers} from "redux";
import {LOG_OUT} from "../constants/actionTypes";
import commonReducer from "./commonReducer";
import warehouseReducer from "../modules/Zgroup/warehouse/warehouseReducer";


const appReducer = combineReducers({
    ...commonReducer,
    //other reducer
    zWarehouse: warehouseReducer,

});

const rootReducer = (state, action) => {
    if (action.type === LOG_OUT) {
        state = {};
    }

    return appReducer(state, action);
};

export default rootReducer;
