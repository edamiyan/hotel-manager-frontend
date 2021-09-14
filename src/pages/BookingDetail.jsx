import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import api from "../api";
import {Button, Card, Container, Row} from "react-bootstrap";
import MyModal from "../components/UI/modal/MyModal";
import BookingFormEdit from "../components/BookingFormEdit";

let status = {};

const BookingDetail = () => {
    const {roomId, bookingId} = useParams()
    const [booking, setBooking] = useState()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const history = useHistory();

    async function fetchBooking() {
        const response = await api.getBookingByID(roomId, bookingId);
        setBooking(response);
    }

    async function editBooking(booking) {
        handleShow()
        const response = await api.editBooking(roomId, bookingId, booking)
        if (response.status === 200) {
            setBooking(booking);
        }
    }

    async function deleteBooking() {
        const response = await api.deleteBooking(roomId, bookingId);
        if (response.status === 200) {
            history.push(`/rooms/${roomId}`);
        }
    }

    useEffect(() => {
        fetchBooking();
    }, [])

    if (booking) {
        booking.arrival_date = new Date(booking.arrival_date);
        booking.departure_date = new Date(booking.departure_date);
        switch (booking.is_booking) {
            case true:
                status = {text: 'Заказ с Booking', bgColor: '#06276F', color: 'white'};
                break;
            case false:
                switch (booking.status) {
                    case 1:
                        status = {text: 'Не оплачено', bgColor: '#FF5A40', color: 'white'};
                        break;
                    case 2:
                        status = {text: 'Депозит внесен', bgColor: '#FFA900', color: 'white'};
                        break;
                    case 3:
                        status = {text: 'Оплачено', bgColor: '#2E8F00', color: 'white'};
                        break;
                }
        }
    }

    return (
        <div>
            <MyModal title={'Редактировать параметры номера'} show={show} handleClose={handleClose}>
                <BookingFormEdit
                    booking={booking}
                    editBooking={editBooking}
                    handleClose={handleClose}
                />
            </MyModal>
            {booking
                ? <Container>
                    <Card
                        style={{
                            background: status.bgColor,
                        }}
                        text={'white'}
                        className="mt-5 row"
                    >
                        <Card.Header style={{color: status.color}}>
                            <h3>Информация по бронированию</h3>
                        </Card.Header>
                        <Card.Body style={{color: status.color}}>
                            <Card.Title>Имя: {booking.name}</Card.Title>
                            <Card.Subtitle className={'mb-2'}>Дата
                                прибытия: {booking.arrival_date.toLocaleDateString()}</Card.Subtitle>
                            <Card.Subtitle className={'mb-2 '}>Дата
                                отъезда: {booking.departure_date.toLocaleDateString()}</Card.Subtitle>
                            <Card.Subtitle className={'mb-2'}>Количество гостей: {booking.guests_number}</Card.Subtitle>
                            <Card.Subtitle className={'mb-1'}>Статус: {status.text}</Card.Subtitle>
                            <Card.Text>
                                Комментарий: {booking.comment}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer style={{color: status.color}}><h6>Телефон: <a style={{color: 'white'}}
                                                                                   href={'tel:' + booking.phone}>{booking.phone}</a>
                        </h6>
                            <Row className={'mt-4'}>
                                <Button
                                    className={'col-6'}
                                    variant="secondary"
                                    onClick={handleShow}
                                >
                                    Редактировать
                                </Button>
                                <Button
                                    className={'col-6'}
                                    variant="danger"
                                    onClick={deleteBooking}
                                >
                                    Удалить
                                </Button>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Container>
                : <div></div>
            }
        </div>
    );
};

export default BookingDetail;