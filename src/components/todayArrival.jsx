import React from 'react';
import {Container} from "react-bootstrap";
import moment from "moment";

const TodayArrival = ({items}) => {
    const today = moment()
    let todayArrivalCount = 0;
    let todayDepartureCount = 0;

    if (items) {
        items.map(item => {
            if (item.start_time.format('DD.MM.YYYY') === today.format('DD.MM.YYYY')) {
                todayArrivalCount++;
            }
            else if (item.end_time.format('DD.MM.YYYY') === today.format('DD.MM.YYYY')) {
                todayDepartureCount++;
            }
        });


    }
    return (
        <Container className={'mt-4'} style={{color: "#021d5f"}}>
            {todayArrivalCount
                ?<h1>Сегодня необходимо заселить: {todayArrivalCount}</h1>
                :<div></div>
            }
            {todayDepartureCount
                ?<h1>Сегодня необходимо освободить: {todayDepartureCount}</h1>
                :<div></div>
            }
        </Container>
    );
};

export default TodayArrival;