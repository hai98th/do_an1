import React from "react";
import * as prj1Api from "./prj1/prj1Api";
import {post} from 'axios';


class MeetingContainer extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            meeting: [],
            file:null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this)
    }

    componentWillMount(){
        this.getMeeting();

    }

    onFormSubmit(e){
        e.preventDefault();
        this.fileUpload(this.state.file).then((response)=>{
            console.log(response.data);
        })
    }
    onChange(e) {
        this.setState({file:e.target.files[0]})
    }
    fileUpload(file){
        const url = 'http://localhost:5000/api/uploader';
        const formData = new FormData();
        formData.append('file',file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        return  post(url, formData,config)
    }


    getMeeting() {

        prj1Api.getMeetingApi()
            .then((res)=>{
                this.setState({meeting: res.data.meeting})
            });

    }
    render(){
        return (
            <div className="card">
                <div className="card-content">
                    <div className="tab-content">
                        <div className="flex-row flex">
                            <h4 className="card-title">
                                <strong>Quản lý cuộc họp {this.props.tabChose}</strong>
                            </h4>

                            <div>
                                <div>
                                    <button
                                        className="btn btn-primary btn-round btn-xs button-add none-margin"
                                        type="button"
                                        onClick={() => {

                                        }}>

                                        <strong>+</strong>

                                    </button>
                                </div>
                            </div>


                        </div>
                        <div>
                            <form onSubmit={this.onFormSubmit}>
                                <h1>File Upload</h1>
                                <input type="file" onChange={this.onChange} />
                                <button type="submit">Upload</button>
                            </form>
                        </div>



                        <br/>

                    </div>
                    <div>

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
                                    this.state.meeting && this.state.meeting.map((mt,index)=>{
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

                                                               }}>
                                                                <i className="material-icons">edit</i>
                                                            </a>
                                                        </div>

                                                        <div
                                                            style={{display: "inline-block"}}>
                                                            <a style={{color: "#878787"}}
                                                               onClick={() => {

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



                    </div>
                </div>
            </div>
        );
    }
}
export default MeetingContainer