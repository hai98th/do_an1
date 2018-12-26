import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import * as prj1Action from "../prj1Action";
import {confirm} from "../../../helpers/helper";

class MeetingRoomComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.delRoom = this.delRoom.bind(this);
    }

    delRoom(id){
        confirm("error", "Xóa phòng", "Bạn có chắc muốn xóa phòng", () => {
            this.props.prj1Action.deleteRoom(id);
        });
    }
    render() {

        return (
            <div className="row" id="list-base">
                {
                    this.props.room && this.props.room.map((rm, index) => {
                        return (
                            <div className="col-xs-12 col-sm-6 col-md-4" key={index}>
                                <div className="card card-chart">
                                    <div className="card-header" data-background-color="white" style={{
                                        borderRadius: '10px'
                                    }}>
                                        <div id="simpleBarChart" className="ct-chart"
                                             style={{
                                                 width: '100%',
                                                 background: 'url(' + rm.ava_url + ')',
                                                 backgroundSize: 'cover',
                                                 backgroundPosition: 'center',
                                                 height: '200px',
                                                 borderRadius: '10px',
                                                 position: "relative"
                                             }}
                                        />
                                    </div>
                                    <div className="card-content" style={{minHeight: '140px'}}>
                                        <div className="card-action"
                                             style={{height: 55, justifyContent: "space-between", display: "flex"}}>
                                            <div>

                                                <h4 className="card-title" style={{fontWeight: 300}}>
                                                    {rm.name}
                                                </h4>

                                            </div>
                                            <div className="btn-group-action">
                                                <div style={{display: 'inline-block'}}>
                                                    <a data-toggle="tooltip" title="" type="button"
                                                       rel="tooltip" data-original-title="Sửa"
                                                       onClick={() => {
                                                           this.props.prj1Action.handleRoomModal(rm);
                                                           this.props.prj1Action.openRoomModal();
                                                       }}>
                                                        <i className="material-icons">edit</i></a>
                                                    <a data-toggle="tooltip" title="" type="button"
                                                       rel="tooltip" data-original-title="Xóa"
                                                       onClick={() => {
                                                           this.delRoom(rm.id);
                                                       }}>
                                                        <i className="material-icons">delete</i></a></div>
                                            </div>
                                        </div>
                                        <div style={{display: "flex", justifyContent: "space-between", height: 60}}>
                                            <p className="category">
                                                {rm.description}
                                            </p>
                                        </div>

                                    </div>


                                </div>
                            </div>
                        );
                    })
                }


            </div>
        );
    }
}

MeetingRoomComponent.propTypes = {
    room: PropTypes.array.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(MeetingRoomComponent);