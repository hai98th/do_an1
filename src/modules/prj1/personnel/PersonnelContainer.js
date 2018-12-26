import React from 'react';
import Search from "../../../components/common/Search";
import TooltipButton from "../../../components/common/TooltipButton";
import Pagination from "../../../components/common/Pagination";
import PersonnelComponent from "./PersonnelComponent";
import * as prj1Action from "../prj1Action";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import PersonnelModal from "./PersonnelModal";

class PersonnelContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount(){
        this.props.prj1Action.getPersonnel();
        this.props.prj1Action.tabChose(1);
    }

    render() {

        return (
            <div className="card">
                <div className="card-content">
                    <div className="tab-content">
                        <div className="flex-row flex">
                            <h4 className="card-title">
                                <strong>Quản lí nhân sự</strong>
                            </h4>

                            <div>
                                <TooltipButton
                                    placement="top"
                                    text="Thêm nhân viên">
                                    <button
                                        className="btn btn-primary btn-round btn-xs button-add none-margin"
                                        type="button"
                                        onClick={() => {
                                            this.props.prj1Action.handlePersonnelModal({
                                                sounds: JSON.stringify(["a","b"])
                                            });
                                            this.props.prj1Action.openPersonnelModal();
                                        }}>

                                        <strong>+</strong>
                                    </button>
                                </TooltipButton>
                            </div>

                        </div>


                        <Search
                            onChange={()=>{}}
                            value=""
                            placeholder="Nhập tên nhân viên"
                        /><br/>

                        <br/>

                    </div>
                    <div>

                        <PersonnelComponent personnel={this.props.personnel}/>


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
                    <PersonnelModal/>
                </div>
            </div>


        );

    }
}

PersonnelContainer.propTypes = {
    prj1Action: PropTypes.object.isRequired,
    personnel: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        personnel: state.prj1.personnel,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        prj1Action: bindActionCreators(prj1Action, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonnelContainer);