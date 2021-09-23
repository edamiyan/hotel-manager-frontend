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
    const [isLoading, setIsLoading] = useState(true);

    async function fetchRooms() {
        const response = await api.getRooms();
        setRoomList(response.data)
        setIsLoading(false);
    }

    useEffect(() => {
        fetchRooms();
    }, [])

    async function createRoom(newPost) {
        const response = await api.postRoom(newPost);
        if (response.status === 200) {
            newPost.id = response.data.id;
            if (!!roomList) {
                setRoomList([...roomList, newPost])
            }
            else {
                setRoomList([newPost])
            }
        }
        handleClose();
    }

    async function deleteRoom(id) {
        const response = await api.deleteRoom(id);
        if (response.status === 200) {
            await fetchRooms();
        }
    }

    return (
        <Container>
            <div className="row">
                <Button style={{backgroundColor: '#06276F', color: 'white'}} className={"col-md-12 mt-3 mb-3 me-2"} variant="primary" onClick={handleShow}>
                    Создать новую комнату
                </Button>
            </div>
            <MyModal title={'Создать номер'} show={show} handleClose={handleClose}>
                <RoomForm create={createRoom}/>
            </MyModal>
            {!isLoading
                ?
                <RoomsList
                    rooms={roomList}
                    deleteRoom={deleteRoom}
                />
                :<div></div>
            }

        </Container>
    );
};
export default Rooms;