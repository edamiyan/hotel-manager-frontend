import React from 'react';
import RoomCard from "./roomCard";
import {Container} from "react-bootstrap";

const RoomsList = ({rooms}) => {
    return (
        <div
            className={"row"}
        >
                {rooms !== null
                    ? rooms.map(room =>
                        <RoomCard
                            room={room}
                            key={room.id}
                        />
                    )
                    : <h3 style={{textAlign: "center"}}>Список комнат пуст</h3>
                }
        </div>
    );
};

export default RoomsList;