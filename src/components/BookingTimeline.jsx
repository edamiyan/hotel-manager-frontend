import React from 'react';
import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import {Container} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import TimelineHeaders from "react-calendar-timeline/lib/lib/headers/TimelineHeaders";
import DateHeader from "react-calendar-timeline/lib/lib/headers/DateHeader";
import SidebarHeader from "react-calendar-timeline/lib/lib/headers/SidebarHeader";

const BookingTimeline = ({groups, items}) => {
    const history = useHistory()
    const handleItemClick = async (itemId, _, time) => {
        const roomId = items.filter(item => item.id === itemId)[0].group;
        history.push(`/rooms/${roomId}/booking/${itemId}`);
    };

    return (
        <Container className={"mt-5 mb-5"}>
            {items.length > 0 && groups.length > 0
                ? <Timeline
                    groups={groups}
                    items={items}
                    defaultTimeStart={moment()}
                    defaultTimeEnd={moment().add(1.8, 'week')}
                    onItemSelect={handleItemClick}
                    sidebarWidth={40}
                    style={{fontWeight: "500"}}

                >
                    <TimelineHeaders style={{background: '#06266f'}}>
                        <SidebarHeader

                        >
                            {({getRootProps}) => {
                                return <div {...getRootProps()}
                                            style={{color: "white", textAlign: "center", width: "40px"}}>№</div>
                            }}
                        </SidebarHeader>
                        <DateHeader unit="primaryHeader"/>
                        <DateHeader/>
                    </TimelineHeaders>
                </Timeline>
                : <div></div>
            }
        </Container>
    );
};

export default BookingTimeline;