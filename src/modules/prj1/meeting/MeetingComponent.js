import React from 'react';
import {bindActionCreators} from "redux";
import * as prj1Action from "../prj1Action";
import {connect} from "react-redux";
import PropTypes from "prop-types";






class MeetingComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.delMeeting = this.delMeeting.bind(this);
    }


    delMeeting(id){

            this.props.prj1Action.deleteMeeting(id);

    }

    render() {



        return (
            <div className="table-responsive">
                <table className="table table-hover table-striped">
                    <thead className="text-rose">
                    <tr className="text-rose">
                        <th>STT</th>
                        <th>Name</th>
                        <th>Nội dung</th>
                        <th>Số thành<br/> viên</th>
                        <th>Phòng</th>
                        <th>Thời gian họp</th>
                        <th>Điều hành <br/> cuộc họp</th>
                        <th>Thư ký</th>
                        <th>Chi tiết</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.meeting && this.props.meeting.map((mt,index)=>{
                            let name = mt.name;
                            let description = mt.content;
                            return(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td className="film-name">
                                        <div>
                                            <div>{name.length < 12 ? name : name.slice(0, 12).concat('...')}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <div>{description.length < 25 ? description : description.slice(0, 25).concat('...')}</div>
                                        </div>
                                    </td>

                                    <td>
                                        &ensp;&emsp;{JSON.parse(mt.members).length + 2}
                                    </td>
                                    <td>
                                        {mt.room_name}
                                    </td>
                                    <td>
                                        {mt.date_time}
                                    </td>
                                    <td className="film-name">
                                        {mt.leader}
                                    </td>
                                    <td className="film-name">
                                        {mt.secretary}
                                    </td>
                                    <td>


                                        <div className="btn-group-action">

                                            <a
                                                onClick={() => {
                                                    this.props.prj1Action.handleMeetingModal(mt);
                                                }}

                                                style={{display: "inline-block"}}>
                                                <div >
                                                    <i className="material-icons">add_circle</i>
                                                </div>
                                            </a>


                                            <div
                                                           style={{display: "inline-block"}}>
                                                <a style={{color: "#878787"}}
                                                   onClick={() => {
                                                       this.props.prj1Action.handleMeetingModal(mt);
                                                       this.props.prj1Action.openMeetingModal();
                                                   }}>
                                                    <i className="material-icons">edit</i>
                                                </a>
                                            </div>

                                            <div
                                                           style={{display: "inline-block"}}>
                                                <a style={{color: "#878787"}}
                                                   onClick={() => {
                                                       this.delMeeting(mt.id);
                                                   }}>
                                                    <i className="material-icons">delete</i>
                                                </a>
                                            </div>
                                        </div>

                                    </td>
                                </tr>
                            );
                        })
                    }


                    </tbody>
                </table>
            </div>
        );
    }
}

MeetingComponent.propTypes = {
    meeting: PropTypes.array.isRequired,
    prj1Action: PropTypes.object.isRequired,

};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        prj1Action: bindActionCreators(prj1Action, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingComponent);