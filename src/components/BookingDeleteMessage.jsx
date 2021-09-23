import React from 'react';
import {Container} from "react-bootstrap";

const BookingDeleteMessage = (props) => {

    const deleteBooking = (e) => {
        e.preventDefault();
        props.deleteBooking();
        props.deleteBookingHandleClose();
    }

    return (
        <Container>
            <button className="col-12 btn mt-2 btn-secondary" onClick={props.deleteBookingHandleClose}>Отменить</button>
            <button className="col-12 btn mt-2 btn-danger" onClick={deleteBooking}>Удалить</button>
        </Container>
    );
};

export default BookingDeleteMessage;