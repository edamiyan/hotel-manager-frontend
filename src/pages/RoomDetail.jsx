import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import api from "../api";
import {Button, Card, Container} from "react-bootstrap";
import MyModal from "../components/UI/modal/MyModal";
import RoomFormEdit from "../components/RoomFormEdit";
import TableBookings from "../components/tableBookings";
import RoomDeleteMessage from "../components/RoomDeleteMessage";

const RoomDetail = () => {
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteRoomHandleClose = () => setShowDelete(false);
    const deleteRoomHandleShow = () => setShowDelete(true);

    const history = useHistory();
    const room_id = useParams();

    const [room, setRoom] = useState({room_number: '', double_bed: '', single_bed: '', description: ''});

    async function fetchRoom() {
        const response = await api.getRoomByID(room_id.id);
        setRoom(response);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchRoom();
    }, [])

    async function edit(fields) {
        const response = await api.editRoom(room_id.id, fields);
        if (response.status === 200) {
            setRoom(fields);
        }
    }

    async function deleteRoom() {
        const response = await api.deleteRoom(room_id.id);
        if (response.status === 200) {history.push("/rooms");}
    }

    return (
        <Container>
            <MyModal title={'Редактировать параметры номера'} show={show} handleClose={handleClose}>
                <RoomFormEdit
                    room = {room}
                    edit = {edit}
                    handleClose = {handleClose}
                />
            </MyModal>
            <MyModal title={'Вы хотите удалить номер?'} show={showDelete} handleClose={deleteRoomHandleClose}>
                <RoomDeleteMessage
                    roomId = {room.id}
                    deleteRoom = {deleteRoom}
                    deleteRoomHandleClose = {deleteRoomHandleClose}
                />
            </MyModal>
            {!isLoading
                ?
                <React.Fragment>
                    <Card className={"mt-5 row"}>
                        <Card.Body>
                            <div>
                                <Card.Title>Номер комнаты: {room.room_number}</Card.Title>
                                <Card.Subtitle className="mb-2"> Количество двуспальных
                                    мест: {room.double_bed}</Card.Subtitle>
                                <Card.Subtitle>Количество односпальных мест: {room.single_bed}</Card.Subtitle>
                                {room.description === ''
                                    ? <div></div>
                                    : <Card.Text>Описание: {room.description}</Card.Text>
                                }
                                <Card.Title>Цена за сутки: {room.price} рублей</Card.Title>
                            </div>
                            <div className="row d-flex justify-content-center">
                                <Button
                                    variant="secondary"
                                    className={"m-1 col-lg-5 col-md-12"}
                                    onClick={handleShow}
                                >
                                    Редактировать
                                </Button>
                                <Button
                                    onClick={deleteRoomHandleShow}
                                    variant="danger"
                                    className={"m-1 col-lg-5 col-md-12"}
                                >
                                    Удалить
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                    <TableBookings
                        roomId={room_id}
                        roomNumber={room.room_number}
                    />
                </React.Fragment>
                : <div></div>
            }
        </Container>
    );
};

export default RoomDetail;