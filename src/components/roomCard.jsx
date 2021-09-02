import React from 'react';
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";


const RoomCard = ({room}) => {
    return (
        <Card className="mt-3 col-lg-5">
            <Link to={`/rooms/${room.id}`}>
                <h3>Номер комнаты: {room.room_number}</h3>
                <div className="row">
                    <h6>Максимальная вместимость: {room.double_bed + room.single_bed}</h6>
                </div>
                <div className="row">
                    <h6>
                        Цена (сутки): {room.price} рублей
                    </h6>
                </div>
            </Link>
        </Card>
    );
};

export default RoomCard;