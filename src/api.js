import axios from "axios";
import moment from "moment";
import {url} from "./.env/configs";

function logout(err) {
    console.log(err);
    localStorage.clear();
    window.location.reload();
}

async function getRooms() {
    const token = localStorage.getItem('token');
    const response = await axios.get(
        `${url}/api/rooms/`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    ).catch(err => {
            logout(err)
        }
    )
    if (!response) {
        return []
    }
    return response.data
}

async function postRoom(room) {
    const token = localStorage.getItem('token');
    const response = await axios.post(
        `${url}/api/rooms/`,
        {
            room_number: parseInt(room.room_number),
            double_bed: parseInt(room.double_bed),
            single_bed: parseInt(room.single_bed),
            description: room.description,
            price: parseInt(room.price)
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    ).catch(err => {
            logout(err)
        }
    )
    if (!response) {
        return []
    }

    return response
}

async function deleteRoom(id) {
    const token = localStorage.getItem('token');
    const response = await axios.delete(
        `${url}/api/rooms/${id}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    ).catch(err => {
            logout(err)
        }
    )
    if (!response) {
        return []
    }

    return response
}

async function editRoom(id, fields) {
    const token = localStorage.getItem('token');
    const response = await axios.put(
        `${url}/api/rooms/${id}`,
        {
            room_number: parseInt(fields.room_number),
            double_bed: parseInt(fields.double_bed),
            single_bed: parseInt(fields.single_bed),
            description: fields.description,
            price: parseInt(fields.price)
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    ).catch(err => {
            logout(err)
        }
    )
    if (!response) {
        return []
    }

    return response
}

async function getRoomByID(id) {
    const token = localStorage.getItem('token');
    const response = await axios.get(
        `${url}/api/rooms/${id}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    ).catch(err => {
            logout(err)
        }
    )
    if (!response) {
        return []
    }

    return response.data
}

async function getBookings(roomId) {
    const token = localStorage.getItem('token');
    const response = await axios.get(
        `${url}/api/rooms/${roomId}/bookings/`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    ).catch(err => {
            logout(err)
        }
    )
    if (!response) {
        return []
    }

    return response.data
}

async function getAllBookings() {
    const token = localStorage.getItem('token');
    const response = await axios.get(
        `${url}/api/booking/`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    ).catch(err => {
            logout(err)
        }
    )
    if (!response) {
        return []
    }

    return response.data
}

async function getBookingByID(roomId, bookingId) {
    const token = localStorage.getItem('token');
    const response = await axios.get(
        `${url}/api/rooms/${roomId}/bookings/${bookingId}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    ).catch(err => {
            logout(err)
        }
    )
    if (!response) {
        return []
    }

    return response.data
}

async function postBooking(booking) {
    const token = localStorage.getItem('token');
    const response = await axios.post(
        `${url}/api/rooms/${booking.roomId}/bookings/`,
        {
            name: booking.name,
            phone: booking.phone,
            arrival_date: moment(booking.arrival_date).add(13, 'hour'),
            departure_date: moment(booking.departure_date).add(12, 'hour'),
            guests_number: parseInt(booking.guests_number),
            is_booking: booking.is_booking,
            comment: booking.comment,
            status: parseInt(booking.status),
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    ).catch(err => {
            logout(err)
        }
    )
    if (!response) {
        return []
    }
    return response
}

async function getBookingsRoomId(roomId) {
    const token = localStorage.getItem('token');
    const bookings = await axios.get(
        `${url}/api/rooms/${roomId}/bookings/`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    ).catch(err => {
            logout(err)
        }
    )
    if (!bookings) {
        return []
    }
    if (bookings.data.data) {
        bookings.data.data.forEach(booking => {
            booking.roomId = roomId;
        })
    }
    return bookings.data
}

async function editBooking(roomId, bookingId, input) {
    const token = localStorage.getItem('token');
    const response = await axios.put(
        `${url}/api/rooms/${roomId}/bookings/${bookingId}`,
        {
            name: input.name,
            phone: input.phone,
            arrival_date: input.arrival_date,
            departure_date: input.departure_date,
            guests_number: parseInt(input.guests_number),
            is_booking: input.is_booking,
            comment: input.comment,
            status: parseInt(input.status),
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    ).catch(err => {
            logout(err)
        }
    )
    if (!response) {
        return []
    }

    return response
}

async function deleteBooking(roomId, bookingId) {
    const token = localStorage.getItem('token');
    const response = await axios.delete(
        `${url}/api/rooms/${roomId}/bookings/${bookingId}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    ).catch(err => {
            logout(err)
        }
    )
    if (!response) {
        return []
    }

    return response
}

const api = {
    getRooms, postRoom, deleteRoom, getRoomByID, editRoom,
    getBookings, getAllBookings, getBookingByID, postBooking, deleteBooking, getBookingsRoomId, editBooking
}

export default api;
