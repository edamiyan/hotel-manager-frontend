import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import api from "../api";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import MyModal from "../components/UI/modal/MyModal";
import BookingFormEdit from "../components/BookingFormEdit";
import moment from "moment";



const BookingDetail = () => {
    const [status, setStatus] = useState({text: '', bgColor: 'white', color: ''});
    const {roomId, bookingId} = useParams();
    const [booking, setBooking] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const history = useHistory();

    async function fetchBooking() {
        const response = await api.getBookingByID(roomId, bookingId);
        setBooking(response);
    }

    async function editBooking(bookingEdited) {
        handleShow()
        const response = await api.editBooking(roomId, bookingId, bookingEdited)
        if (response.status === 200) {
            setBooking(bookingEdited);
        }
    }

    async function deleteBooking() {
        const response = await api.deleteBooking(roomId, bookingId);
        if (response.status === 200) {
            history.push(`/rooms/${roomId}`);
        }
    }


    function transformStatus() {
        if (booking) {
            booking.arrival_date = new Date(moment(booking.arrival_date).hours(13));
            booking.departure_date = new Date(moment(booking.departure_date).hours(12));
            switch (booking.is_booking) {
                default:
                    /* falls through */
                case true:
                    setStatus({text: 'Заказ с Booking', bgColor: '#06276F', color: 'white'});
                    break;
                case false:
                    switch (booking.status) {
                        default:
                            /* falls through */
                        case 1:
                            setStatus({text: 'Не оплачено', bgColor: '#FF5A40', color: 'white'});
                            break;
                        case 2:
                            setStatus({text: 'Депозит внесен', bgColor: '#FFA900', color: 'white'});
                            break;
                        case 3:
                            setStatus({text: 'Оплачено', bgColor: '#2E8F00', color: 'white'});
                            break;
                    }
            }
        }
    }

    useEffect(() => {
        fetchBooking();
    }, [])

    useEffect(() => {
        transformStatus();
    }, [booking])


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
                        className="mt-xl-5 mt-md-4 mt-3 row"
                    >
                        <Card.Header style={{color: status.color}}>
                            <h3>Информация по бронированию</h3>
                        </Card.Header>
                        <Card.Body style={{color: status.color}}>
                            <Row className={'mb-3'}>
                                <Col lg={3} md={4} sm={5} xs={6}><Card.Title>Имя клиента:</Card.Title></Col>
                                <Col lg={9} md={8} sm={7} xs={6}><Card.Title>{booking.name}</Card.Title></Col>
                            </Row>
                            <hr/>
                            <Row className={'mb-3'}>
                                <Col lg={3} md={4} sm={5} xs={6}><Card.Subtitle className={'mb-2'}>Дата прибытия:</Card.Subtitle></Col>
                                <Col lg={9} md={8} sm={7} xs={6}><Card.Subtitle>{moment(booking.arrival_date)?.format("dd, DD MMMM YYYY, HH:mm")}</Card.Subtitle></Col>
                            </Row>
                            <hr/>
                            <Row className={'mb-3'}>
                                <Col lg={3} md={4} sm={5} xs={6}><Card.Subtitle>Дата отъезда:</Card.Subtitle></Col>
                                <Col lg={9} md={8} sm={7} xs={6}><Card.Subtitle>{moment(booking.departure_date)?.format("dd, DD MMMM YYYY, HH:mm")}</Card.Subtitle></Col>
                            </Row>
                            <hr/>
                            <Row className={'mb-3'}>
                                <Col lg={3} md={4} sm={5} xs={6}>
                                    <Card.Subtitle className={'mb-2'}>Количество гостей:</Card.Subtitle>
                                </Col>
                                <Col lg={9} md={8} sm={7} xs={6}>
                                    <Card.Subtitle className={'mb-2'}>{booking.guests_number}</Card.Subtitle>
                                </Col>
                            </Row>
                            <hr/>
                            <Row className={'mb-3'}>
                                <Col lg={3} md={4} sm={5} xs={6}>
                                    <Card.Subtitle className={'mb-2'}>Статус бронирования:</Card.Subtitle>
                                </Col>
                                <Col lg={9} md={8} sm={7} xs={6}>
                                    <Card.Subtitle className={'mb-2'}>{status.text}</Card.Subtitle>
                                </Col>
                            </Row>
                            <hr/>
                            {booking.comment
                                ?
                                <Card.Text>
                                    Комментарий: {booking.comment}
                                </Card.Text>
                                :
                                <Card.Text>
                                    Комментарий к заказу отсутствует
                                </Card.Text>
                            }

                        </Card.Body>
                        <Card.Footer style={{color: status.color}}><h6>Телефон для связи: <a style={{color: 'white'}}
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