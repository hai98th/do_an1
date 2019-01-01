import React from "react";
import * as prj1Api from "./prj1/prj1Api";

class DetailContainer extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            meeting: [],
            detail:[]
        };
    }

    componentWillMount(){
        this.getDetail(1);
        this.getMeeting();
        console.log(this.state.meeting)

    }

    getMeeting() {

        prj1Api.getMeetingApi()
            .then((res)=>{
                this.setState({
                    ...this.state,
                    meeting: res.data.meeting})
            });

    }
    getDetail() {

        prj1Api.getDetailApi(1)
            .then((res)=>{
                this.setState({
                    ...this.state,
                    detail: res.data.detail
                })
            });

    }

    render(){
        let mt = this.state.meeting;
        let dt = this.state.detail;
        return (

            <div className="container-fluid">
                <div className="card">
                    <div className="card-content">
                        <div className="tab-content">
                            <h4 className="card-title">
                                <strong>{mt.name}</strong>
                            </h4>
                            <br/>
                            <div>
                                <h5><span style={{color: "tomato"}}>Nội dung: </span>
                                    {mt.content}</h5>
                                <div className="row">
                                    <div className="col-md-4 col-xs-4">
                                        <h5>Điều hành: <b>{mt.leader}</b></h5>
                                        <h5>Thư ký: <b>{mt.secretary}</b></h5>
                                    </div>
                                    <div className="col-md-4 col-xs-4">
                                        {
                                            mt.members
                                        }
                                    </div>
                                    <div className="col-md-4 col-xs-4">
                                        <h5>Start Date: {mt.date_time}</h5>
                                        <h5>Room: {mt.room_name}</h5>
                                    </div>
                                </div>
                                <hr/>
                                <div className="flex-row flex">
                                    <h4 className="card-title">
                                        <span style={{color: "tomato"}}>Chi tiết cuộc họp:</span>
                                    </h4>

                                    <div>
                                        <div
                                           >
                                            <button
                                                className="btn btn-primary btn-round btn-xs button-add none-margin"
                                                type="button"
                                                onClick={() => {

                                                }}>

                                                <strong>+</strong>
                                            </button>
                                        </div>
                                    </div>

                                </div><br/>

                                {
                                    dt && dt.map((aa, index) => {
                                        return (
                                            <p key={index}>
                                                <b> {aa.time} &emsp; {aa.name}:</b>
                                                &emsp;{aa.content}
                                                &emsp;<span style={{color: "#878787"}}>
                                                <i className="material-icons" style={{fontSize: 18}}
                                                   onClick={()=>{

                                                   }}
                                                >edit</i>
                                                <i style={{fontSize: 18}} className="material-icons"
                                                   onClick={()=>{
                                                   }}
                                                >delete</i>
                                            </span>
                                            </p>
                                        );
                                    })
                                }
                                <br/>
                                <hr/>
                                <p style={{textAlign: "center"}}>Kết thúc cuộc họp </p>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default DetailContainer