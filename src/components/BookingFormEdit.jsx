import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";
import {Button, Col, Form, Row} from "react-bootstrap";

const BookingFormEdit = (props) => {
    const [booking, setBooking] = useState({
        name: props.booking.name,
        phone: props.booking.phone,
        arrival_date: props.booking.arrival_date,
        departure_date: props.booking.departure_date,
        guests_number: props.booking.guests_number,
        is_booking: props.booking.is_booking,
        comment: props.booking.comment,
        status: props.booking.status,
    })

    const editBooking = (e) => {
        e.preventDefault()
        props.editBooking(booking);
        props.handleClose();
    }

    return (
        <Form>
            <Row>
                <Form.Group className="form-group mt-2" controlId="exampleForm.ControlInput1">
                    <Form.Control
                        value={booking.name}
                        onChange={e => setBooking({...booking, name: e.target.value})}
                        type="text"
                        placeholder="Имя"
                    />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group className="form-group mt-2" controlId="exampleForm.ControlInput1">
                    <Form.Control
                        value={booking.phone}
                        onChange={e => setBooking({...booking, phone: e.target.value})}
                        type="text"
                        placeholder="Телефон"
                    />
                </Form.Group>
            </Row>
            <Row>
                <Col lg={6} xs={6}>
                    <Form.Group className="form-group mt-2" controlId="exampleForm.ControlInput1">
                        <DatePicker
                            className={"form-control"}
                            placeholderText="Дата заезда"
                            dateFormat="dd.MM.yyyy"
                            locale={ru}
                            onChange={(date) => setBooking({...booking, arrival_date: date})}
                            selected={booking.arrival_date}
                            disabledKeyboardNavigation
                        />
                    </Form.Group>
                </Col>
                <Col lg={6} xs={6}>
                    <Form.Group className="form-group mt-2" controlId="exampleForm.ControlInput1">
                        <DatePicker
                            className={"form-control"}
                            placeholderText="Дата отъезда"
                            dateFormat="dd.MM.yyyy"
                            locale={ru}
                            onChange={(date) => setBooking({...booking, departure_date: date})}
                            selected={booking.departure_date}
                            WithPortal
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col lg={4}>
                    <Form.Group className="form-group mt-2" controlId="exampleForm.ControlInput1">
                        <Form.Control
                            value={booking.guests_number}
                            onChange={e => setBooking({...booking, guests_number: e.target.value})}
                            type="text"
                            placeholder="Кол-во гостей"
                        />
                    </Form.Group>
                </Col>
                <Col lg={6}>
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
                <Col>
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
            </Row>
            <Row>
                <Form.Group className="form-group mt-2" controlId="exampleForm.ControlInput1">
                    <Form.Check
                        label={"Заказ с Booking?"}
                        type="checkbox"
                        id="flexCheckDefault"
                        checked={booking.is_booking}
                        onChange={e => setBooking({...booking, is_booking: !booking.is_booking})}
                    />
                </Form.Group>
            </Row>
            <Row>
                <Col>
                    <Button
                        type={"submit"}
                        className="btn btn-danger mt-2"
                        onClick={editBooking}>Создать комнату
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default BookingFormEdit;