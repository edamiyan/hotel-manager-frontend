import React, {useEffect, useState} from 'react';
import BookingForm from "../components/BookingForm";
import BookingTimeline from "../components/BookingTimeline";
import api from "../api";
import moment from "moment";
import {selectedAndCanMove} from "react-calendar-timeline/lib/lib/items/styles";
import {Switch} from "react-router-dom";

const Main = () => {
    const [roomList, setRoomList] = useState([]);
    const [groups, setGroups] = useState([]);
    const [items, setItems] = useState([]);


    async function fetchRooms() {
        const response = await api.getRooms();
        setRoomList(response.data);
        setGroups(response.data.map(item => {
            return {id: item.id, title: `Номер комнаты: ${item.room_number}`}
        })
        )
    }

    function getBgColor(is_booking, status) {
        switch (is_booking) {
            case true:
                return 'blue'
            case false:
                switch (status) {
                    case 0:
                        return 'white'
                    case 1:
                        return 'red'
                    case 2:
                        return 'yellow'
                    case 3:
                        return 'green'
                }
        }
    }

    function getTextColor(is_booking, status) {
        switch (is_booking) {
            case true:
                return 'white'
            case false:
                switch (status) {
                    case 0:
                        return 'black'
                    case 1:
                        return 'white'
                    case 2:
                        return 'black'
                    case 3:
                        return 'white'
                }
        }
    }

    async function fetchBookings() {
        let promises = []
        groups.forEach(group => {
            promises.push(api.getBookingsRoomId(group.id))
        })
        const result = await Promise.all(promises);
        const resArr = result.map(item => item.data).filter(item => !!item).flat();
        setItems(resArr.map(item => {
            return {
                id: item.id,
                group: item.roomId,
                title: item.name ,
                canMove: false,
                canResize: false,
                canChangeGroup: false,
                start_time: moment(item.arrival_date),
                end_time: moment(item.departure_date),
                itemProps: {
                    'data-custom-attribute': 'Random content',
                    'aria-hidden': true,
                    style: {
                        background: getBgColor(item.is_booking, item.status),
                        color: getTextColor(item.is_booking, item.status),
                        fontSize: 16
                    }
                }
            }
        }))
    }

    useEffect(() => {
        fetchRooms();
    }, [])

    useEffect(() => {
        fetchBookings();
    }, [groups])

    return (
        <div className={"mt-4"}>
            <BookingForm
                roomList={roomList}
            />
            <BookingTimeline
                groups={groups}
                items={items}
            />
        </div>
    );
};

export default Main;