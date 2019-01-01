import React from 'react';
import MeetingComponent from "./MeetingComponent";
import {bindActionCreators} from "redux";
import * as prj1Action from "../prj1Action";
import {connect} from "react-redux";
import PropTypes from "prop-types";


class MeetingContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.props.prj1Action.getMeeting();

    }


    render() {

        return (
            <div className="card">
                <div className="card-content">
                    <div className="tab-content">
                        <div className="flex-row flex">
                            <h4 className="card-title">
                                <strong>Quản lý cuộc họp</strong>
                            </h4>

                            <div>
                                <div>
                                    <button
                                        className="btn btn-primary btn-round btn-xs button-add none-margin"
                                        type="button"
                                        onClick={() => {
                                            this.props.prj1Action.handleMeetingModal({});
                                            this.props.prj1Action.openMeetingModal();
                                        }}>

                                        <strong>+</strong>
                                    </button>
                                </div>
                            </div>

                        </div>




                        <br/>

                    </div>
                    <div>

                        <MeetingComponent meeting={this.props.meeting}/>



                    </div>
                </div>
            </div>


        );

    }
}


MeetingContainer.propTypes = {
    prj1Action: PropTypes.object.isRequired,
    meeting: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        meeting: state.meeting,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        prj1Action: bindActionCreators(prj1Action, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingContainer);