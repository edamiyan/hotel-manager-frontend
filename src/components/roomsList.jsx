import React from 'react';
import {useHistory} from "react-router-dom";
import {Table} from "react-bootstrap";

const RoomsList = ({rooms}) => {
    const history = useHistory();
    return (
        rooms !== null
        ? rooms.length === 0
            ?
                <h2 style={{textAlign: 'center'}}>Список комнат пуст</h2>
            :
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Номер</th>
                        <th>Вместимость (чел.)</th>
                        <th>Стоимость (р./сутки)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        rooms.map(room =>
                            <tr key={room.id} onClick={() => {history.push(`/rooms/${room.id}`)}}>
                                <td>{room.room_number}</td>
                                <td>{room.single_bed + 2*room.double_bed}</td>
                                <td>{room.price}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>
        :
            <h2 style={{textAlign: 'center'}}>Список комнат пуст</h2>

    );
};

export default RoomsList;