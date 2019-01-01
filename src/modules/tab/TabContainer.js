import React from 'react';

class TabContainer extends React.Component {


    render() {

        return (
            <ul className="nav">
                <li className={window.location.pathname === '/personnel' ? 'active' : ""}>
                    <a
                    href={"/personnel"}>
                        <p>
                            <i className="material-icons">people</i>Nhân Sự
                        </p>
                    </a>
                </li>

                <li className={window.location.pathname === '/room' ? 'active' : ""}>
                    <a href={"/room"}>
                        <p><i className="material-icons">
                            home</i>Phòng họp</p></a>
                </li>

                <li className={window.location.pathname !=='/personnel' && window.location.pathname !== '/room' ? 'active' : ""}>
                    <a href={"/meeting"}>
                        <p><i className="material-icons">
                            meeting_room</i>Cuộc họp</p></a>
                </li>


            </ul>
        );

    }
}


export default TabContainer;