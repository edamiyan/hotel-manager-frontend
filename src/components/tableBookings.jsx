import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import api from "../api";
import RoomCard from "./roomCard";
import {Link, useHistory} from "react-router-dom";

const TableBookings = ({roomId}) => {
    const history1 = useHistory();
    const [bookings, setBookings] = useState([]);
    const token = localStorage.getItem('token');

    async function fetchBookings() {
        const response = await api.getBookings(token, roomId.id);
        setBookings(response.data);
    }

    useEffect(() => {
        fetchBookings();
    }, [])


    if (bookings != null) {
        bookings.map(booking => {
                booking.arrival_date = new Date(booking.arrival_date);
                booking.departure_date = new Date(booking.departure_date);
            }
        )
    }

    return (
        <div className={"row"}>
            {bookings != null
                ?
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Дата заезда</th>
                        <th>Дата отъезда</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookings.map(booking =>
                        <tr onClick={function () {
                            history1.push(`/rooms/${roomId.id}/booking/${booking.id}`)
                        }} key={booking.id}>
                            <td>{booking.name}</td>
                            <td>{booking.arrival_date.toLocaleDateString()}</td>
                            <td>{booking.departure_date.toLocaleDateString()}</td>
                        </tr>
                    )
                    }
                    </tbody>
                </Table>
                :
                <div>Бронирования не найдены</div>
            }
        </div>
    );
};

export default TableBookings;