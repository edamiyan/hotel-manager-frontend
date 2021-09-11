import React, {useEffect, useState} from 'react';
import api from "../api";
import RoomsList from "../components/roomsList";
import {Button, Container} from 'react-bootstrap';
import MyModal from "../components/UI/modal/MyModal";
import RoomForm from "../components/RoomForm";

const Rooms = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [roomList, setRoomList] = useState([]);

    async function fetchRooms() {
        const response = await api.getRooms();
        setRoomList(response.data)
    }

    useEffect(() => {
        fetchRooms();
    }, [])

    async function createRoom(newPost) {
        const response = await api.postRoom(newPost);
        console.log(response);
        await fetchRooms();
        handleClose();
    }

    async function deleteRoom(id) {
        const response = await api.deleteRoom(id);
        console.log(response);
        await fetchRooms();
    }

    return (
        <Container>
            <div className="row">
                <Button className={"col-md-12 mt-3"} variant="primary" onClick={handleShow}>
                    Создать новую комнату
                </Button>
            </div>
            <MyModal title={'Создать номер'} show={show} handleClose={handleClose}>
                <RoomForm create={createRoom}/>
            </MyModal>
            <RoomsList
                rooms={roomList}
                deleteRoom={deleteRoom}
            />
        </Container>
    );
};

export default Rooms;