import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import api from "../api";
import {useHistory} from "react-router-dom";
import moment from "moment";
import 'moment/locale/ru'
const TableBookings = ({roomId}) => {
    moment.locale('ru')
    const history1 = useHistory();
    const [bookings, setBookings] = useState([]);

    async function fetchBookings() {
        const response = await api.getBookings(roomId.id);
        setBookings(response.data);
    }

    useEffect(() => {
        fetchBookings();
    }, [])


    function getStatusColor(status) {
        switch (status) {
            case 1:
                return '#9A001E'
            case 2:
                return '#FFA900'
            case 3:
                return '#2E8F00'
            default:
                return 'white'
        }
    }

    if (bookings != null) {
        bookings.forEach(booking => {
                booking.arrival_date = new Date(booking.arrival_date);
                booking.departure_date = new Date(booking.departure_date);
                booking.statusColor = getStatusColor(booking.status);
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
                        <tr style={{color: 'white', backgroundColor: booking.statusColor}} onClick={() => {
                            history1.push(`/rooms/${roomId.id}/booking/${booking.id}`)
                        }} key={booking.id}>
                            <td>{booking.name}</td>
                            <td>{moment(booking.arrival_date).format("DD MMMM yyyy")}</td>
                            <td>{moment(booking.departure_date).format("DD MMMM yyyy")}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
                :
                <div>Бронирования не найдены</div>
            }
        </div>
    );
};

export default TableBookings;