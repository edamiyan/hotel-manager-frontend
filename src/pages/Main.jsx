import React, {useEffect, useState} from 'react';
import BookingForm from "../components/BookingForm";
import BookingTimeline from "../components/BookingTimeline";
import api from "../api";
import moment from "moment";
import TodayArrival from "../components/todayArrival";

const Main = () => {
    const [roomList, setRoomList] = useState([]);
    const [groups, setGroups] = useState([]);
    const [items, setItems] = useState([]);


    async function fetchRooms() {
        const response = await api.getRooms();
        setRoomList(response.data);

        if (response) {
            setGroups(response.data.map(item => {
                return {id: item.id, title: `Номер комнаты: ${item.room_number}`}
            }))
        }
    }

    function getBgColor(is_booking, status) {
        switch (is_booking) {
            case true:
                return '#06276F'
            case false:
                switch (status) {
                    case 0:
                        return 'white'
                    case 1:
                        return '#9A001E'
                    case 2:
                        return '#FFA900'
                    case 3:
                        return '#2E8F00'
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
                        return 'white'
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
                        border:  '1px solid black',
                        borderRadius: '3px',
                        color: getTextColor(item.is_booking, item.status),
                        fontSize: 16,
                        fontWeight: 450,
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
            <TodayArrival
                items={items}
            />
            <BookingTimeline
                groups={groups}
                items={items}
            />
        </div>
    );
};

export default Main;