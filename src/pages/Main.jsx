import React, {useEffect, useState} from 'react';
import BookingForm from "../components/BookingForm";
import BookingTimeline from "../components/BookingTimeline";
import api from "../api";
import moment from "moment";

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
                title: item.name,
                canMove: false,
                canResize: false,
                canChangeGroup: false,
                start_time: moment(item.arrival_date),
                end_time: moment(item.departure_date),
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