import "babel-polyfill";
import React from "react";
import renderRoutes from "../routes/renderer/RouteRenderer";
import GoodRoute from "../routes/GoodRoute";
import goodRootReducer from "../reducers/good";


import "../../node_modules/toastr/build/toastr.min.css";
import "../styles/react-bootstrap-switch.min.css";
import "../styles/dragula.css";
import "../modules/tasks/task.css";
import "../styles/react-select.css";
import "../styles/react-draft-wysiwyg.css";
import "../styles/styles.scss";

import { render } from "react-dom";
import { browserHistory, Router } from "react-router";
import { Provider } from "react-redux";
import configureStore from "../store/configureStore";

// import rootReducer from "../reducers/index";
const store = configureStore({}, goodRootReducer);

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={renderRoutes(GoodRoute)} />
    </Provider>,
    document.getElementById("app"),
);
