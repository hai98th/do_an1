/**
 * Created by NguyenTienTai on 03/31/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import TooltipButton from "./TooltipButton";
import {MANAGE_API_URL} from "../../constants/env";
import {showErrorNotification, showNotification} from "../../helpers/helper";

function uploadImage(file, completeHandler, progressHandler, error) {
    let url = MANAGE_API_URL + "/file/upload";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    let formData = new FormData();
    formData.append("file", file);
    let ajax = new XMLHttpRequest();
    ajax.addEventListener("load", completeHandler, false);
    ajax.upload.onprogress = progressHandler;
    ajax.addEventListener("error", error, false);
    ajax.open("POST", url);
    ajax.send(formData);
}

class UploadManyImages extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.completeHandler = this.completeHandler.bind(this);
        this.progressHandler = this.progressHandler.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.state = {
            percent: 0,
            isUploading: false,
            files_length: 0,
            uploaded_image_quantity: 0
        };
    }

    completeHandler(event) {
        const data = JSON.parse(event.currentTarget.responseText);
        showNotification("Tải lên thành công");
        let uploaded_image_quantity = 1 + this.state.uploaded_image_quantity;
        this.props.handleFileUpload([...this.props.images_url, data.url]);
        this.setState({
            percent: 0,
            isUploading: !(uploaded_image_quantity === this.state.files_length),
            uploaded_image_quantity
        });
    }

    progressHandler(event) {
        const percent = Math.round(100 * event.loaded / event.total);
        this.setState({
            percent,
        });
    }

    handleFileUpload(e) {
        const fileList = e.target.files;
        const files = Array.from(fileList);
        this.setState({
            percent: 0,
            isUploading: true,
            files_length: files.length,
            uploaded_image_quantity: 0
        });
        files.map((file) => uploadImage(file, this.completeHandler, this.progressHandler, () => {
            showErrorNotification("Có lỗi xảy ra");
        }));
    }

    deleteImage(image) {
        let images_url = this.props.images_url.filter(i => i !== image);
        this.props.handleFileUpload(images_url);
    }

    //Cách dùng: Mảng truyền vào là mảng các url, kết quả trả về là mảng hoàn chỉnh ta cần, là mảng các url

    render() {
        const images_url = this.props.images_url;
        return (
            <div className={this.props.box}>
                {
                    images_url && images_url.map((image, index) => {
                        return (
                            <div key={index}
                                 style={{
                                     padding: "3px"
                                 }}>
                                <div className="container-for-images">
                                    <img style={{
                                        width: "100%",
                                        height: "100%",
                                        background: "url(" + image + ") center center / cover",
                                        position: "absolute",
                                        left: "0",
                                        borderRadius: "5px"
                                    }}
                                         data-original-title=""/>
                                    <div className="overlay-for-images"/>
                                    <TooltipButton text="Xóa" placement="top">
                                        <div className="button-for-images">
                                            <a rel="tooltip"
                                               onClick={() => this.deleteImage(image)}
                                               data-original-title="" title="">
                                                <i className="material-icons">close</i>
                                            </a>
                                        </div>
                                    </TooltipButton>

                                </div>
                            </div>
                        );
                    })
                }
                {
                    <div style={{
                        padding: "3px"
                    }}>
                        <div className="flex-row-center flex-justify-content-center"
                             style={{
                                 width: '100%',
                                 height: '100px',
                                 backgroundColor: '#e8e8e8',
                                 position: "relative",
                                 borderRadius: '5px',
                                 cursor: "pointer",
                                 marginTop: '10px',
                                 marginBottom: '10px'
                             }}>
                            <TooltipButton text="Tải ảnh" placement="top">
                                <label>
                                    <i className="material-icons"
                                       style={{
                                           fontSize: '40px',
                                           color: '#919191',
                                           cursor: "pointer"
                                       }}>add_a_photo
                                    </i>
                                    <input multiple
                                           onChange={this.handleFileUpload}
                                           style={{
                                               cursor: this.state.isUploading ? 'not-allowed' : 'pointer',
                                               position: "absolute",
                                               top: 0,
                                               left: 0,
                                               bottom: 0,
                                               right: 0,
                                               width: "100%",
                                               height: "100%",
                                           }}
                                           type={this.state.isUploading ? 'text' : 'file'}/>
                                </label>
                            </TooltipButton>
                            {
                                this.state.isUploading &&
                                <div className="progress"
                                     style={{
                                         position: "absolute",
                                         left: 0,
                                         bottom: 0,
                                         width: '100%',
                                         zIndex: '100',
                                         marginBottom: '0'
                                     }}>
                                    <div className="progress-bar" role="progressbar"
                                         aria-valuenow="70"
                                         aria-valuemin="0" aria-valuemax="100"
                                         style={{width: `${this.state.percent}%`}}>
                                        <span className="sr-only">{this.state.percent}% Complete</span>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        );
    }
}

UploadManyImages.propTypes = {
    images_url: PropTypes.array.isRequired,
    handleFileUpload: PropTypes.func.isRequired,
    box: PropTypes.string.isRequired
};

export default UploadManyImages;