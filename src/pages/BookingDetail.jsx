import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import api from "../api";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import MyModal from "../components/UI/modal/MyModal";
import BookingFormEdit from "../components/BookingFormEdit";
import moment from "moment";
import BookingDeleteMessage from "../components/BookingDeleteMessage";

const BookingDetail = () => {
    const [status, setStatus] = useState({text: '', bgColor: 'white', color: ''});
    const {roomId, bookingId} = useParams();
    const [booking, setBooking] = useState();
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteBookingHandleClose = () => setShowDelete(false);
    const deleteBookingHandleShow = () => setShowDelete(true);

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
                            setStatus({text: 'Не оплачено', bgColor: '#a91500', color: 'white'});
                            break;
                        case 2:
                            setStatus({text: 'Депозит внесен', bgColor: '#d28a03', color: 'white'});
                            break;
                        case 3:
                            setStatus({text: 'Оплачено', bgColor: '#267500', color: 'white'});
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
            <MyModal title={'Вы хотите удалить номер?'} show={showDelete} handleClose={deleteBookingHandleClose}>
                <BookingDeleteMessage
                    deleteBooking={deleteBooking}
                    deleteBookingHandleClose={deleteBookingHandleClose}
                />
            </MyModal>
            {booking
                ? <Container>
                    <Card
                        className="mt-xl-5 mt-md-4 mt-3 row"
                    >
                        <Card.Header
                            style={{
                                background: status.bgColor,
                                color: status.color,
                            }}
                        >
                            <h3>Информация по бронированию</h3>
                        </Card.Header>
                        <Card.Body>
                            <Row className={'mb-3'}>
                                <Col lg={3} md={4} sm={5} xs={6}><Card.Title>Имя клиента:</Card.Title></Col>
                                <Col lg={9} md={8} sm={7} xs={6}><Card.Title>{booking.name}</Card.Title></Col>
                            </Row>
                            <hr/>
                            <Row className={'mb-3'}>
                                <Col lg={3} md={4} sm={5} xs={6}><Card.Subtitle className={'mb-2'}>Дата
                                    прибытия:</Card.Subtitle></Col>
                                <Col lg={9} md={8} sm={7}
                                     xs={6}><Card.Subtitle>{moment(booking.arrival_date)?.format("dd, DD MMMM YYYY, HH:mm")}</Card.Subtitle></Col>
                            </Row>
                            <hr/>
                            <Row className={'mb-3'}>
                                <Col lg={3} md={4} sm={5} xs={6}><Card.Subtitle>Дата отъезда:</Card.Subtitle></Col>
                                <Col lg={9} md={8} sm={7}
                                     xs={6}><Card.Subtitle>{moment(booking.departure_date)?.format("dd, DD MMMM YYYY, HH:mm")}</Card.Subtitle></Col>
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
                                    <Card.Subtitle className={'mb-2'}
                                                   style={{color: status.bgColor}}>{status.text}</Card.Subtitle>
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
                        <Card.Footer><h6>Телефон для связи: <a style={{color: '#004180', textDecoration: 'none'}}
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
                                    onClick={deleteBookingHandleShow}
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