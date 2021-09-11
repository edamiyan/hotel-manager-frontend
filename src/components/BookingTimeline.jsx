import React, {useEffect, useState} from 'react';
import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import {Container} from "react-bootstrap";
import api from "../api";
import {useHistory} from "react-router-dom";

const BookingTimeline = ({groups, items}) => {
    const history = useHistory()

    async function getRoomId(bookingId) {
        const response = await api.getRoomIdByBookingId(bookingId)
        // Add response check status
        return response.data.room_id
    }

    const handleItemClick = (itemId, _, time) => {
        const roomId = getRoomId(itemId)
        history.push(`/rooms/${roomId}/booking/${itemId}`);
    };

    return (
        <Container className={"mt-5"}>
            {items.length > 0
                ? <Timeline
                    groups={groups}
                    items={items}
                    defaultTimeStart={moment()}
                    defaultTimeEnd={moment().add(1, 'month')}
                    onItemSelect={handleItemClick}
                />
                : <div></div>
            }
        </Container>
    );
};

export default BookingTimeline;