import React from 'react';
import {Container} from "react-bootstrap";

const RoomDeleteMessage = (props) => {

    const deleteRoom = (e) => {
        e.preventDefault();
        props.deleteRoom(props.roomId);
        props.deleteRoomHandleClose();
    }

    return (
        <Container>
                <button className="col-12 btn mt-2 btn-secondary" onClick={props.deleteRoomHandleClose}>Отменить</button>
                <button className="col-12 btn mt-2 btn-danger" onClick={deleteRoom}>Удалить</button>
        </Container>
    );
};

export default RoomDeleteMessage;