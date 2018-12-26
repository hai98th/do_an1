import React from 'react';
import TooltipButton from '../../../components/common/TooltipButton';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import * as prj1Action from "../prj1Action";
import {connect} from "react-redux";
import {confirm} from "../../../helpers/helper";

class PersonnelComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.delPerson = this.delPerson.bind(this);
    }

    delPerson(id){
        confirm("error", "Xóa nhân sự", "Bạn có chắc muốn xóa nhân sự", () => {
            this.props.prj1Action.deletePersonnel(id);
        });
    }

    render() {

        return (
            <div className="table-responsive">
                <table className="table table-hover table-striped">
                    <thead className="text-rose">
                    <tr className="text-rose">
                        <th>STT</th>
                        <th>Ava</th>
                        <th>Họ tên</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Chức vụ</th>
                        <th>Bộ phận</th>
                        <th>File giọng nói</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        this.props.personnel && this.props.personnel.map((ps, index)=>{
                            return(
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img style={{height: 40, width: 40, borderRadius: 20}}
                                             src={ps.ava_url}/>
                                    </td>
                                    <td>
                                        {ps.name}
                                    </td>
                                    <td>
                                        {ps.phone}
                                    </td>
                                    <td>
                                        {ps.email}
                                    </td>
                                    <td>
                                        {ps.position}
                                    </td>
                                    <td>
                                        {ps.part}
                                    </td>
                                    <td>
                                        {
                                            JSON.parse(ps.sounds) && JSON.parse(ps.sounds).map((s, index)=>{
                                                return(
                                                    <div key={index}>
                                                        <audio ref="audio_tag" src={s} controls/>
                                                    </div>
                                                );
                                            })
                                        }
                                    </td>
                                    <td>


                                        <div className="btn-group-action">
                                            <TooltipButton text="Sửa" placement="top"
                                                           style={{display: "inline-block"}}>
                                                <a style={{color: "#878787"}}
                                                   onClick={() => {
                                                       this.props.prj1Action.handlePersonnelModal(ps);
                                                       this.props.prj1Action.openPersonnelModal();
                                                   }}>
                                                    <i className="material-icons">edit</i>
                                                </a>
                                            </TooltipButton>
                                            <TooltipButton text="Xóa" placement="top"
                                                           style={{display: "inline-block"}}>
                                                <a style={{color: "#878787"}}
                                                   onClick={() => {
                                                        this.delPerson(ps.id);
                                                   }}>
                                                    <i className="material-icons">delete</i>
                                                </a>
                                            </TooltipButton>
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
PersonnelComponent.propTypes = {
    personnel: PropTypes.array.isRequired,
    prj1Action: PropTypes.object.isRequired,

};

function mapStateToProps() {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        prj1Action: bindActionCreators(prj1Action, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonnelComponent);