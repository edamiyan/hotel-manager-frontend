import React, {useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import api from "../api";
import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";
import 'react-datepicker/dist/react-datepicker.css'
import { setDefaultLocale } from  "react-datepicker";
import moment from "moment";
setDefaultLocale('ru')

const BookingForm = ({roomList}) => {
    const [booking, setBooking] = useState(
        {
            name: '',
            phone: '',
            arrival_date: '',
            departure_date: '',
            guests_number: '',
            is_booking: false,
            comment: '',
            status: 0,
            roomId: 0,
        })

    const addNewBooking = (e) => {
        e.preventDefault()
        console.log(booking)
        const response = api.postBooking(booking)
        console.log(response)
        setBooking({
            name: '',
            phone: '',
            arrival_date: '',
            departure_date: '',
            guests_number: '',
            is_booking: false,
            comment: '',
            status: 0,
            roomId: 0,
        })
    }

    return (
        <Container>
            <Card>
                <Card.Header style={{color: 'white', backgroundColor: '#06266F'}}>
                    <h4>
                        Добавить новое бронирование
                    </h4>
                </Card.Header>
                <Card.Body className={"p-2"}>
                    <Form>
                        <Row>
                            <Col lg={6}>
                                <Form.Group className="form-group mt-2" controlId="exampleForm.ControlInput1">
                                    <Form.Control
                                        value={booking.name}
                                        onChange={e => setBooking({...booking, name: e.target.value})}
                                        type="text"
                                        placeholder="Имя"
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group className="form-group mt-2" controlId="exampleForm.ControlInput1">
                                    <Form.Control
                                        value={booking.phone}
                                        onChange={e => setBooking({...booking, phone: e.target.value})}
                                        type="text"
                                        placeholder="Телефон"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>

                            <Col lg={3} xs={6}>
                                <Form.Group className="form-group mt-2" controlId="exampleForm.ControlInput1">
                                    <DatePicker
                                        className={"form-control"}
                                        placeholderText="Дата заезда"
                                        dateFormat="dd.MM.yyyy"
                                        locale={ru}
                                        onChange={(date) => setBooking({...booking, arrival_date: date})}
                                        selected={booking.arrival_date}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={3} xs={6}>
                                <Form.Group className="form-group mt-2" controlId="exampleForm.ControlInput1">
                                    <DatePicker
                                        className={"form-control"}
                                        placeholderText="Дата отъезда"
                                        dateFormat="dd.MM.yyyy"
                                        locale={ru}
                                        onChange={(date) => setBooking({...booking, departure_date: date})}
                                        selected={booking.departure_date}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={3}>
                                <Form.Group className="form-group mt-2" controlId="exampleForm.ControlInput1">
                                    <Form.Control
                                        value={booking.guests_number}
                                        onChange={e => setBooking({...booking, guests_number: e.target.value})}
                                        type="text"
                                        placeholder="Количество гостей"
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={3}>
                                <Form.Select
                                    value={booking.status}
                                    onChange={e => setBooking({...booking, status: e.target.value})}
                                    className="form-group mt-2"
                                    aria-label="Default select example">
                                    <option value={0} disabled={true}>Статус бронирования</option>
                                    <option value={1}>Не оплачено</option>
                                    <option value={2}>Депозит внесен</option>
                                    <option value={3}>Оплачено</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6}>
                                <Form.Group className="form-group mt-2" controlId="exampleForm.ControlInput1">
                                    <Form.Control as={"textarea"}
                                                  value={booking.comment}
                                                  onChange={e => setBooking({...booking, comment: e.target.value})}
                                                  type="text"
                                                  placeholder="Комментарий к заказу"
                                                  className="form-control"
                                                  rows="2"
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={3}>
                                <Form.Select
                                    value={booking.roomId}
                                    onChange={e => setBooking({...booking, roomId: e.target.value})}
                                    className="form-group mt-2"
                                    aria-label="Default select example">
                                    <option
                                        value={0}
                                        disabled={true}>
                                        Номер для заселения
                                    </option>
                                    {roomList !== null
                                        ? roomList.map(room =>
                                            <option key={room.id} value={room.id}>Номер
                                                комнаты: {room.room_number}</option>
                                        )
                                        : <option value={0} disabled={true}>Комнаты не найдены!</option>
                                    }
                                </Form.Select>
                            </Col>
                            <Col lg={3}>
                                <Form.Group className="form-group mt-2" controlId="exampleForm.ControlInput1">
                                    <Form.Check
                                        label={"Заказ с Booking?"}
                                        type="checkbox"
                                        id="flexCheckDefault"
                                        checked={booking.is_booking}
                                        onChange={e => setBooking({...booking, is_booking: !booking.is_booking})}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button
                                    type={"submit"}
                                    style={{backgroundColor: '#06266F'}}
                                    className="btn mt-2"
                                    onClick={addNewBooking}>Создать комнату
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default BookingForm;