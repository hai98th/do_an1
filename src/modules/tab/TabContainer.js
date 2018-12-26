import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import * as prj1Action from "../prj1/prj1Action";
import {Link} from 'react-router';


class TabContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {

        return (
            <ul className="nav">
                <li className={this.props.tabChose == 1 ? 'active' : ''}><Link to="prj1/personnel"  onClick={() => {
                    this.props.prj1Action.tabChose(1);
                }}>
                    <p><i className="material-icons">
                        people</i>Nhân Sự</p></Link></li>
                <li className={this.props.tabChose == 2 ? 'active' : ''}><Link to="prj1/meeting"  onClick={() => {
                    this.props.prj1Action.tabChose(2);
                }}>
                    <p><i className="material-icons">
                        meeting_room
                    </i>Cuộc họp</p></Link></li>
                <li className={this.props.tabChose == 3 ? 'active' : ''}><Link to="prj1/meeting_room" onClick={() => {
                    this.props.prj1Action.tabChose(3);
                }}>
                    <p><i className="material-icons">
                        home
                    </i>Phòng họp</p></Link></li>

            </ul>
        );

    }
}

TabContainer.propTypes = {
    tabChose: PropTypes.number.isRequired,
    prj1Action: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
    return {
        tabChose: state.prj1.tabChose,
    };
}


function mapDispatchToProps(dispatch) {
    return {
        prj1Action: bindActionCreators(prj1Action, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TabContainer);