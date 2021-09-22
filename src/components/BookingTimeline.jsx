import React from 'react';
import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import {Container} from "react-bootstrap";
import api from "../api";
import {useHistory} from "react-router-dom";
import TimelineHeaders from "react-calendar-timeline/lib/lib/headers/TimelineHeaders";
import DateHeader from "react-calendar-timeline/lib/lib/headers/DateHeader";

const BookingTimeline = ({groups, items}) => {
    const history = useHistory()
    async function getRoomId(bookingId) {
        const response = await api.getRoomIdByBookingId(bookingId)
        // Add response check status
        return response.data.room_id
    }

   const handleItemClick = async (itemId, _, time) => {
        const roomId = items.filter(item => item.id === itemId).group
        // const roomId = await getRoomId(itemId)
        history.push(`/rooms/${roomId}/booking/${itemId}`);
    };

    return (
        <Container className={"mt-5 mb-5"}>
            {items.length > 0 && groups.length > 0
                ? <Timeline
                    groups={groups}
                    items={items}
                    defaultTimeStart={moment()}
                    defaultTimeEnd={moment().add(2, 'week')}
                    onItemSelect={handleItemClick}
                >
                    <TimelineHeaders style={{background: '#06266f'}}>
                        <DateHeader unit="primaryHeader" />
                        <DateHeader />
                    </TimelineHeaders>
                </Timeline>
                : <div></div>
            }
        </Container>
    );
};

export default BookingTimeline;