import React from 'react';
import Search from "../../../components/common/Search";
import TooltipButton from "../../../components/common/TooltipButton";
import Pagination from "../../../components/common/Pagination";
import MeetingRoomComponent from "./MeetingRoomComponent";
import MeetingRoomModal from "./MeetingRoomModal";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import * as prj1Action from "../prj1Action";


class MeetingRoomContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount(){
        this.props.prj1Action.getRoom();
        this.props.prj1Action.tabChose(3);
    }



    render() {

        return (
            <div className="card">
                <div className="card-content">
                    <div className="tab-content">
                        <div className="flex-row flex">
                            <h4 className="card-title">
                                <strong>Quản lý phòng họp</strong>
                            </h4>

                            <div>
                                <TooltipButton
                                    placement="top"
                                    text="Tạo phòng">
                                    <button
                                        className="btn btn-primary btn-round btn-xs button-add none-margin"
                                        type="button"
                                        onClick={() => {
                                            this.props.prj1Action.handleRoomModal({});
                                            this.props.prj1Action.openRoomModal();
                                        }}>

                                        <strong>+</strong>
                                    </button>
                                </TooltipButton>
                            </div>

                        </div>


                        <Search
                            onChange={()=>{}}
                            value=""
                            placeholder="Nhập tên phòng để tìm kiếm"
                        /><br/>

                        <br/>

                    </div>
                    <div>

                        <MeetingRoomComponent room={this.props.room}/>


                        <br/>
                        <div className="row float-right">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                 style={{textAlign: 'right'}}>
                                <b style={{marginRight: '15px'}}>
                                    Hiển thị kêt quả từ {1}
                                    - {20}/{20}</b><br/>
                                <Pagination
                                    totalPages={1}
                                    currentPage={1}
                                    loadDataPage={()=>{}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <MeetingRoomModal/>
            </div>


        );

    }
}

MeetingRoomContainer.propTypes = {
    prj1Action: PropTypes.object.isRequired,
    room: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        room: state.prj1.room,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        prj1Action: bindActionCreators(prj1Action, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingRoomContainer);