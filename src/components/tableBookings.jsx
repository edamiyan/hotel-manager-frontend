import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import api from "../api";
import {useHistory} from "react-router-dom";
import moment from "moment";
import 'moment/locale/ru'


const TableBookings = ({roomId, roomNumber}) => {
    moment.locale('ru')
    const history = useHistory();
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchBookings() {
        const response = await api.getBookings(roomId.id);
        if (response.data) {
            response.data.sort(function (a, b) {
                var c = new Date(a.arrival_date);
                var d = new Date(b.arrival_date);
                return c - d;
            });
            const today = moment();
            const responseFiltered = response.data.filter((item) => {
                return today.diff(item.departure_date, 'days') <= 0;
            })
            setBookings(responseFiltered);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchBookings();
    }, [])


    function getStatusColor(isBooking, status) {
        switch (isBooking) {
            case true:
                return '#06276F'
            case false:
                switch (status) {
                    case 1:
                        return '#9A001E'
                    case 2:
                        return '#FFA900'
                    case 3:
                        return '#2E8F00'
                    default:
                        return 'rose'
                }
            default:
                return 'rose'
        }
    }

    if (bookings != null) {
        bookings.forEach(booking => {
                booking.arrival_date = new Date(booking.arrival_date);
                booking.departure_date = new Date(booking.departure_date);
                booking.statusColor = getStatusColor(booking.is_booking, booking.status);
            }
        )
    }

    return (
        <div className={"row mt-4"}>
            {!isLoading
                ?
                bookings.length
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
                                history.push(`/rooms/${roomId.id}/booking/${booking.id}`)
                            }} key={booking.id}>
                                <td>{booking.name}</td>
                                <td>{moment(booking.arrival_date).format("DD MMMM yyyy")}</td>
                                <td>{moment(booking.departure_date).format("DD MMMM yyyy")}</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                    :<h3>Отсутствуют предстоящие бронирования для комнаты №:{roomNumber}</h3>
                : <div></div>
            }
        </div>
    );
};

export default TableBookings;