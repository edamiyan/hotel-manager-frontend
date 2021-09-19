import React, {useEffect, useState} from 'react';
import BookingForm from "../components/BookingForm";
import BookingTimeline from "../components/BookingTimeline";
import api from "../api";
import moment from "moment";
import TodayArrival from "../components/todayArrival";
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";


const Main = () => {
    const [roomList, setRoomList] = useState([]);
    const [groups, setGroups] = useState([]);
    const [items, setItems] = useState([]);
    const [doFetch, setDoFetch] = useState(false);

    async function fetchRooms() {
        const response = await api.getRooms();
        if (response.data) {
            setRoomList(response.data);
            setGroups(response.data.map(item => {
                return {id: item.id, title: `${item.room_number}`}
            }))
        }
    }

    function getBgColor(is_booking, status) {
        switch (is_booking) {
            default:
                /* falls through */
            case true:
                return '#06276F'
            case false:
                switch (status) {
                    default:
                        /* falls through */
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
            default:
                /* falls through */
            case true:
                return 'white'
            case false:
                switch (status) {
                    default:
                        /* falls through */
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
        const resArrFiltered = resArr.filter((item) => {
            return moment().diff(item.departure_date, 'month') <= 1;
        })
        setItems(resArrFiltered.map(item => {
            return {
                id: item.id,
                group: item.roomId,
                title: item.name,
                canMove: false,
                canResize: false,
                canChangeGroup: false,
                start_time: moment(item.arrival_date).add(10, "hours"),
                end_time: moment(item.departure_date).add(9, "hours"),
                itemProps: {
                    'data-custom-attribute': 'Random content',
                    'aria-hidden': true,
                    style: {
                        background: getBgColor(item.is_booking, item.status),
                        border: '1px solid black',
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
    }, [groups, doFetch])

    return (
        <div className={"mt-4"}>
            <BookingForm
                roomList={roomList}
                doFetch={doFetch}
                setDoFetch={setDoFetch}
            />
            <TodayArrival
                items={items}
            />
            <BookingTimeline
                groups={groups}
                items={items}
            />
            {groups.length < 1
                ? <Container>
                    <h2 className={'p-2'}
                        style={{border: '2px solid #06266f', borderRadius: '5px', backgroundColor: '#06266f'}}>
                        <Link
                            style={{color: 'white', textDecoration: 'none'}}
                            to={'/rooms'}>Создайте свой первый номер</Link>
                    </h2>
                </Container>
                : <div></div>
            }
            {items.length < 1
                ? <Container>
                    <h2 className={'p-2'}
                        style={{border: '2px solid #06266f', borderRadius: '5px', backgroundColor: '#06266f'}}>
                        <Link
                            style={{color: 'white', textDecoration: 'none'}}
                            to={'/home'}>Создайте первое бронирование</Link>
                    </h2>
                </Container>
                : <div></div>
            }

        </div>
    );
};

export default Main;