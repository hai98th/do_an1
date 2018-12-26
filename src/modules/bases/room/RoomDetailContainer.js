import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import RoomGrid from "./RoomGrid";
import PropTypes from "prop-types";
import * as seatContants from "../seat/seatConstants";
import * as seatApi from "../seat/seatApi";
import {
    displayGlobalLoading,
    hideGlobalLoading,
    createSeats,
    setSelectedSeat,
    setSeatCurrentAction,
} from "../seat/seatActions";
import CreateSeatComponent from "../seat/CreateSeatComponent";
import ButtonList from "./ButtonList";
import { ProgressBar, ControlLabel, Badge } from "react-bootstrap";
import { uploadRoomLayout } from "../../rooms/roomApi";
import Slider from "../../../components/common/Slider";

// Import actions here!!

class RoomDetailContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initSeat = {
            name: "",
            r: 1,
            color: "rgb(244, 67, 54)",
        };
        this.gridStep = 15;
        this.state = {
            roomLayoutUrl: "",
            width: 0,
            height: 0,
            seat: this.initSeat,
            seats: [],
            gridSize: 30,
            gridOn: false,
            uploading: false,
            percentComplete: 0,
        };

        this.changeGridSize = this.changeGridSize.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.onPointClick = this.onPointClick.bind(this);
        this.changeSeatAction = this.changeSeatAction.bind(this);
        this.updateSeat = this.updateSeat.bind(this);
        this.createSeat = this.createSeat.bind(this);
        this.archiveSeat = this.archiveSeat.bind(this);
        this.updateSeatFormData = this.updateSeatFormData.bind(this);
        this.saveSeats = this.saveSeats.bind(this);
        this.loadSeats = this.loadSeats.bind(this);
        this.toggleGrid = this.toggleGrid.bind(this);
        this.handleUploadLayoutImage = this.handleUploadLayoutImage.bind(this);
    }

    componentWillMount() {
        this.loadSeats();
        this.props.actions.setSeatCurrentAction("");
    }

    changeGridSize(value) {
        this.setState({
            gridSize: Number(value) * this.gridStep,
        });
    }

    toggleGrid() {
        const { gridOn } = this.state;
        this.setState({
            gridOn: !gridOn,
        });
    }

    handleUploadLayoutImage(event) {
        const file = event.target.files[0];
        this.setState({
            uploading: true,
        });
        uploadRoomLayout({
            roomId: this.state.roomId,
            file,
            completeHandler: event => {
                const data = JSON.parse(event.currentTarget.responseText);
                const { width, height, room_layout_url } = data.room;
                this.setState({
                    roomLayoutUrl: room_layout_url,
                    width,
                    height,
                    percentComplete: 0,
                    uploading: false,
                });
            },
            progressHandler: event => {
                const percentComplete = Math.round(
                    100 * event.loaded / event.total,
                );
                this.setState({
                    percentComplete,
                });
            },
        });
    }

    async loadSeats() {
        this.props.actions.displayGlobalLoading();

        const res = await seatApi.getSeats(this.props.params.roomId);
        const { seats, width, height, room_layout_url } = res.data.data;

        this.props.actions.hideGlobalLoading();

        this.setState({
            width,
            height,
            roomLayoutUrl: room_layout_url,
            roomId: this.props.params.roomId,
            seats: seats.map((seat, index) => {
                return {
                    ...seat,
                    index,
                };
            }),
        });
    }

    changeSeatAction(action) {
        this.setState({
            seat: this.initSeat,
        });
        this.props.actions.setSeatCurrentAction(action);
    }

    createSeat(seat) {
        const { seats } = this.state;
        this.setState({
            seats: [
                ...seats,
                {
                    ...seat,
                    name: seat.name || seats.length + 1,
                    index: seats.length,
                },
            ],
        });
    }

    updateSeat(seat) {
        const { seats } = this.state;
        this.setState({
            seats: seats.map(s => {
                if (s.index === seat.index) {
                    return {
                        ...s,
                        ...seat,
                        active: 1,
                    };
                }
                return {
                    ...s,
                    active: 0,
                };
            }),
        });
    }

    archiveSeat(index) {
        const { seats } = this.state;
        this.setState({
            seats: seats.map(s => {
                if (s.index === index) {
                    return {
                        ...s,
                        archived: s.archived ? 0 : 1,
                    };
                }
                return s;
            }),
        });
    }

    onClick(point) {
        // console.log("click", point);
        const { currentAction } = this.props;
        const { seat } = this.state;
        switch (currentAction) {
            case seatContants.CREATE_SEAT:
                this.createSeat({
                    ...seat,
                    color: seat.color ? seat.color : "#c50000",
                    x: point.x,
                    y: point.y,
                });
                return;
            default:
                // clear current selected seat
                // actions.setSelectedSeat({});
                return;
        }
    }

    onDrag(point) {
        // console.log("drag",point);

        if (this.props.currentAction === seatContants.MOVE_SEAT) {
            this.updateSeat({
                x: point.x,
                y: point.y,
                index: point.index,
            });
        }
    }

    async saveSeats() {
        this.props.actions.displayGlobalLoading();
        const res = await seatApi.createSeats(
            this.state.roomId,
            this.state.seats,
        );
        const { seats } = res.data.data;
        // console.log(res);
        this.setState({
            seats: seats.map((seat, index) => {
                return {
                    ...seat,
                    index,
                };
            }),
        });
        this.props.actions.hideGlobalLoading();
    }

    onPointClick(index) {
        // console.log("Point click",index);
        let currentSeat = {};
        switch (this.props.currentAction) {
            case seatContants.EDIT_SEAT:
                this.setState({
                    seats: this.state.seats.map(seat => {
                        if (seat.index === index) {
                            currentSeat = seat;
                            return {
                                ...seat,
                                active: 1,
                            };
                        }
                        return {
                            ...seat,
                            active: 0,
                        };
                    }),
                });
                this.setState({
                    seat: currentSeat,
                });
                return;
            case seatContants.ARCHIVE_SEAT:
                this.archiveSeat(index);
                return;
        }
    }

    updateSeatFormData(seat) {
        this.setState({
            seat,
        });
        this.updateSeat(seat);
    }

    render() {
        return (
            <div>
                <div>
                    <ButtonList
                        toggleGrid={this.toggleGrid}
                        gridOn={this.state.gridOn}
                        handleUploadLayoutImage={this.handleUploadLayoutImage}
                        saveSeats={this.saveSeats}
                        changeAction={this.changeSeatAction}
                        currentAction={this.props.currentAction}
                    />{" "}
                </div>
                <div className="row">
                    {" "}
                    {this.state.gridOn && (
                        <div className="col-sm-6">
                            <ControlLabel>
                                <span
                                    style={{
                                        marginRight: 5,
                                    }}
                                >
                                    Kích thước lưới{" "}
                                </span>{" "}
                                <Badge>
                                    {" "}
                                    {parseInt(this.state.gridSize || 10)}{" "}
                                </Badge>{" "}
                            </ControlLabel>{" "}
                            <Slider
                                id="gridSize"
                                onChange={this.changeGridSize}
                                step={1}
                                value={this.state.gridSize / this.gridStep || 1}
                                min={1}
                                max={20}
                            />{" "}
                        </div>
                    )}{" "}
                </div>
                <div>
                    {" "}
                    {(this.props.currentAction === seatContants.CREATE_SEAT ||
                        this.props.currentAction ===
                            seatContants.EDIT_SEAT) && (
                        <CreateSeatComponent
                            seat={this.state.seat}
                            updateSeatFormData={this.updateSeatFormData}
                        />
                    )}{" "}
                </div>
                <div
                    style={{
                        position: "relative",
                    }}
                >
                    {" "}
                    {this.state.uploading && (
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                zIndex: 99,
                                justifyContent: "space-around",
                                display: "flex",
                                alignItems: "center",
                                background: "rgba(0,0,0,0.6)",
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <ProgressBar
                                bsStyle="success"
                                style={{
                                    width: "80%",
                                }}
                                now={this.state.percentComplete}
                                label={`${this.state.percentComplete}%`}
                            />{" "}
                        </div>
                    )}{" "}
                    <RoomGrid
                        gridSize={this.state.gridSize}
                        gridOn={this.state.gridOn}
                        onClick={this.onClick}
                        onDrag={this.onDrag}
                        roomLayoutUrl={this.state.roomLayoutUrl}
                        width={this.state.width}
                        height={this.state.height}
                        currentAction={this.props.currentAction}
                        onPointClick={this.onPointClick}
                        roomId={Number(this.props.params.roomId)}
                        seats={this.state.seats}
                    />{" "}
                </div>{" "}
            </div>
        );
    }
}

RoomDetailContainer.propTypes = {
    actions: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    seat: PropTypes.object.isRequired,
    seats: PropTypes.array.isRequired,
    currentAction: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    const { seats, currentAction, seat } = state.seat;
    return {
        seats,
        seat,
        currentAction,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                displayGlobalLoading,
                hideGlobalLoading,
                setSelectedSeat,
                setSeatCurrentAction,
                createSeats,
            },
            dispatch,
        ),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    RoomDetailContainer,
);
