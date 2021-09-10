import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import api from "../api";
import {Button, Card, Container} from "react-bootstrap";
import MyModal from "../components/UI/modal/MyModal";
import BookingFormEdit from "../components/BookingFormEdit";

const BookingDetail = () => {
    const {roomId, bookingId} = useParams()
    const [booking, setBooking] = useState()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function fetchBooking() {
        const response = await api.getBookingByID(roomId, bookingId);
        setBooking(response);
    }

    function editBooking() {
        handleShow()
    }

    function deleteBooking() {
    }

    useEffect(() => {
        fetchBooking();
    }, [])

    let status = '';
    if (booking) {
        booking.arrival_date = new Date(booking.arrival_date);
        booking.departure_date = new Date(booking.departure_date);
        switch (booking.status) {
            case 1:
                status = {text: 'Не оплачено', variant: 'danger'};
                break;
            case 2:
                status = {text: 'Депозит внесен', variant: 'warning'};
                break;
            case 3:
                status = {text: 'Оплачено', variant: 'success'}
                break;
            default:
                status = {text: 'Без статуса', variant: 'light'}

        }
    }

    return (
        <div>
            <MyModal title={'Редактировать параметры номера'} show={show} handleClose={handleClose}>
                <BookingFormEdit
                    booking = {booking}
                    editBooking = {editBooking}
                    handleClose = {handleClose}
                />
            </MyModal>
            {booking
                ? <Container>
                    <Card
                        bg={status.variant}
                        text={'white'}
                        className="mb-2 row"
                    >
                        <Card.Header>Информация по бронированию</Card.Header>
                        <Card.Body>
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
                        <Card.Footer>Телефон: <a style={{color: 'white'}} href="tel:{booking.phone}">{booking.phone}</a></Card.Footer>
                        <Button
                            variant="secondary"
                            onClick={editBooking}
                        >
                            Редактировать
                        </Button>
                        <Button
                            variant="danger"
                            onClick={deleteBooking}
                        >
                            Удалить
                        </Button>
                    </Card>
                </Container>
                : <div></div>
            }
        </div>
    );
};

export default BookingDetail;