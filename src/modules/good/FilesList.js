import React from 'react';
import PropTypes from 'prop-types';
import {confirm} from "../../helpers/helper";
import {Media} from "react-bootstrap";
import Avatar from "../../components/common/Avatar";
import TooltipButton from "../../components/common/TooltipButton";

class FilesList extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                {
                    this.props.files.map((file) => {
                        const formats = ["jpg", "jpeg", "png", "gif"];
                        return (
                            <Media key={file.id} style={{wordBreak: "break-all"}}>
                                <Media.Left align="top">
                                    {formats.includes(file.ext) ? (
                                        <Avatar url={file.url} size={64}/>
                                    ) : (
                                        <div style={{
                                            textAlign: "center",
                                            lineHeight: "64px",
                                            border: "1px solid #d9d9d9",
                                            width: 64,
                                            backgroundColor: "#d9d9d9",
                                            height: 64,
                                            fontWeight: "bold",
                                            borderRadius: 5,
                                            fontSize: 18
                                        }}>
                                            {file.ext}
                                        </div>
                                    )}

                                </Media.Left>
                                <Media.Body>
                                    <div>
                                        <strong>
                                            <a className="text-rose" href={file.url} target="_blank">{file.name}</a>
                                        </strong>
                                    </div>
                                    <div>
                                        <div style={{fontSize: "12px"}}>Tải lên lúc {file.created_at}</div>

                                        {
                                            !this.props.disableEdit && (
                                                <div className="btn-group-action">
                                                    <TooltipButton text="Tải tập tin" placement="top">
                                                        <a href={file.url} target="_blank">
                                                            <i className="material-icons">file_download</i>
                                                        </a>
                                                    </TooltipButton>
                                                    <TooltipButton text="Xoá tập tin" placement="top">
                                                        <a onClick={() => {
                                                            confirm("warning",
                                                                "Xác nhận xoá tập tin",
                                                                "Tập tin này sẽ bị xoá vĩnh viễn",
                                                                () => {
                                                                    this.props.deleteFile(file);
                                                                });
                                                        }}>
                                                            <i className="material-icons">delete</i>
                                                        </a>
                                                    </TooltipButton>
                                                </div>
                                            )
                                        }

                                    </div>
                                </Media.Body>
                            </Media>
                        );
                    })
                }
            </div>
        );
    }
}

FilesList.propTypes = {
    disableEdit: PropTypes.bool,
    deleteFile: PropTypes.func,
    files: PropTypes.array.isRequired
};

export default FilesList;