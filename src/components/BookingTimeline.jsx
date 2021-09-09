import React, {useEffect, useState} from 'react';
import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import {Container} from "react-bootstrap";
import api from "../api";

const BookingTimeline = ({groups, items}) => {
    return (
        <Container className={"mt-5"}>
            {items.length > 0
                ? <Timeline
                    groups={groups}
                    items={items}
                    defaultTimeStart={moment()}
                    defaultTimeEnd={moment().add(1, 'month')}
                />
                : <div></div>
            }
        </Container>
    );
};

export default BookingTimeline;