import React from "react";
import PropTypes from "prop-types";
import D3RoomGrid from "./D3RoomGrid";

// Import actions here!!

class RoomGrid extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.getGridState = this.getGridState.bind(this);
        this.el = "#" + this.props.canvasId;
    }

    componentDidMount() {
        D3RoomGrid.setOnClick(this.props.onClick);
        D3RoomGrid.setOnDrag(this.props.onDrag);
        D3RoomGrid.setOnPointClick(this.props.onPointClick);

        const { width, height } = this.props;

        D3RoomGrid.create(this.el, { width, height }, this.getGridState());
    }

    componentDidUpdate() {
        // console.log(this.getGridState());
        const state = this.getGridState();
        D3RoomGrid.update(this.el, state);
    }

    componentWillUnmount() {
        D3RoomGrid.destroy(this.el);
    }

    getGridState() {
        const {
            seats,
            width,
            height,
            roomLayoutUrl,
            gridSize,
            gridOn,
        } = this.props;
        return { seats, width, height, roomLayoutUrl, gridSize, gridOn };
    }

    render() {
        return <div id={this.props.canvasId} />;
    }
}

RoomGrid.propTypes = {
    gridOn: PropTypes.bool.isRequired,
    gridSize: PropTypes.number.isRequired,
    seats: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    roomLayoutUrl: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    onDrag: PropTypes.func.isRequired,
    currentAction: PropTypes.string,
    canvasId: PropTypes.string,
    onPointClick: PropTypes.func.isRequired,
};

RoomGrid.defaultProps = {
    canvasId: "room-canvas",
};

export default RoomGrid;
