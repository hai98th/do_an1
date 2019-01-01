import React from 'react';
import TabContainer from "./modules/tab/TabContainer";
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import {router} from "./router";



class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tabChose : 0,
        };
    }
    


    render() {

        return (
            <div className="wrapper">
                <div
                    className="sidebar"
                    data-active-color="rose"
                    data-background-color="white"
                    data-image="http://d1j8r0kxyu9tj8.cloudfront.net/libs/material/assets/img/sidebar-1.jpg">
                    <div className="logo">
                        <div className="simple-text">
                            Thư ký cuộc họp
                        </div>
                    </div>
                    <div className="sidebar-wrapper">
                        <div className="user">
                            <div className="photo">
                                <div
                                    className="img"
                                    style={{
                                        background: "url(" + "http://d2xbg5ewmrmfml.cloudfront.net/images/1530702150kkeq80ceT0WsRAj.jpg" + ") center center / cover",
                                        width: "80px",
                                        height: "80px",
                                    }}
                                />
                            </div>
                            <div className="info">
                                <a className="collapsed">
                                    Lê Khả Hải
                                </a>
                            </div>
                        </div>
                        <TabContainer/>
                    </div>
                </div>
                <div className="main-panel">
                    <nav className="navbar navbar-transparent navbar-absolute">
                        <div className="container-fluid">
                            <div className="navbar-minimize">
                                <button
                                    id="minimizeSidebar"
                                    className="btn btn-round btn-white btn-fill btn-just-icon">
                                    <i className="material-icons visible-on-sidebar-regular">more_vert</i>
                                    <i className="material-icons visible-on-sidebar-mini">view_list</i>
                                </button>
                            </div>
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"/>
                                    <span className="icon-bar"/>
                                    <span className="icon-bar"/>
                                </button>
                                <div className="navbar-brand">
                                {" "}Lê Khả Hải 20164835{" "}
                                </div>
                            </div>
                            <div className="collapse navbar-collapse">
                                <ul className="nav navbar-nav navbar-right">
                                    <li>
                                        <a>
                                            <i className="material-icons">info</i>
                                            <p className="hidden-lg hidden-md">Quy định</p>
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            className="dropdown-toggle"
                                            data-toggle="dropdown">
                                            <i className="material-icons">exit_to_app</i>
                                            <p className="hidden-lg hidden-md">Đăng xuất</p>
                                        </a>
                                    </li>
                                    <li className="separator hidden-lg hidden-md"/>
                                </ul>
                                <form className="navbar-form navbar-right" role="search">
                                    <div className="form-group form-search is-empty">
                                        <input type="text" className="form-control" placeholder="Search"/>
                                        <span className="material-input"/>
                                    </div>
                                    <button type="submit" className="btn btn-white btn-round btn-just-icon">
                                        <i className="material-icons">search</i>
                                        <div className="ripple-container"/>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </nav>
                    <div className="hai-content">
                        <div className="container-fluid">
                            <BrowserRouter>
                            <Switch>
                                {
                                    router.map((a ,index)=>{
                                        return( <Route path={a.path} component={a.component} key={index} tabChose={this.state.tabChose}/>)
                                    })
                                }
                            </Switch>
                            </BrowserRouter>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
