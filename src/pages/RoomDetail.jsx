import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import api from "../api";
import {Button, Card, Container, Table} from "react-bootstrap";
import MyModal from "../components/UI/modal/MyModal";
import RoomFormEdit from "../components/RoomFormEdit";
import TableBookings from "../components/tableBookings";

const RoomDetail = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const history = useHistory();

    const room_id = useParams()
    const [room, setRoom] = useState({room_number: '', double_bed: '', single_bed: '', description: ''});
    const token = localStorage.getItem('token');

    async function fetchRoom() {
        const response = await api.getRoomByID(token, room_id.id);
        setRoom(response);
    }

    useEffect(() => {
        fetchRoom();
    }, [])

    async function edit(fields) {
        const response = await api.editRoom(token, room_id.id, fields);
        console.log(response);
        await fetchRoom();
    }

    async function deleteRoom() {
        const response = await api.deleteRoom(token, room_id.id);
        console.log(response);
        history.push("/rooms");
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
            <Card className={"row"}>
                <Card.Body>
                    <Card.Title>Номер комнаты: {room.room_number}</Card.Title>
                    <Card.Subtitle className="mb-2"> Количество двуспальных мест: {room.double_bed}</Card.Subtitle>
                    <Card.Subtitle>Количество односпальных мест: {room.single_bed}</Card.Subtitle>
                    {room.description === ''
                        ?<div></div>
                        :<Card.Text>Описание: {room.description}</Card.Text>
                    }
                    <Card.Title>Цена за сутки: {room.price} рублей</Card.Title>
                    <div className="row d-flex justify-content-center">
                        <Button
                            variant="secondary"
                            className={"m-1 col-lg-5 col-md-12"}
                            onClick={handleShow}
                        >
                            Редактировать
                        </Button>
                        <Button
                            onClick={deleteRoom}
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
            />
        </Container>
    );
};

export default RoomDetail;