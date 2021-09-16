import React from 'react';
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";


const RoomCard = ({room}) => {
    return (
        <Card  className="mt-4 ms-auto me-auto" style={{textDecoration: 'none', color: 'black', boxShadow: '6px 6px 5px rgba(122,122,122,0.5)'}}>
            <h3>Номер комнаты: {room.room_number}</h3>

            <div className="row ms-auto">
                <h4>
                    Цена: {room.price} руб./сутки
                </h4>
            </div>
        </Card>
    );
};

export default RoomCard;