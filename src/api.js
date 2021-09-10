import axios from "axios";

const token = localStorage.getItem('token');
export const url = '192.168.0.104:8080'

// function logout() {
//     console.log('LogOut');
//     // localStorage.clear();
// }

async function getRooms() {
    const response = await axios.get(
        `http://${url}/api/rooms/`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
    return response.data
}

async function postRoom(room) {
    const response = await axios.post(
        `http://${url}/api/rooms/`,
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
    )
    return response
}

async function deleteRoom(id) {
    const response = await axios.delete(
        `http://${url}/api/rooms/${id}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
    return response
}

async function editRoom(id, fields) {
    const response = await axios.put(
        `http://${url}/api/rooms/${id}`,
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
    )
    return response
}

async function getRoomByID(id) {
    const room = await axios.get(
        `http://${url}/api/rooms/${id}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
    return room.data
}

async function getBookings(roomId) {
    const bookings = await axios.get(
        `http://${url}/api/rooms/${roomId}/bookings/`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
    return bookings.data
}

async function getBookingByID(roomId, bookingId) {
    const bookings = await axios.get(
        `http://${url}/api/rooms/${roomId}/bookings/${bookingId}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
    return bookings.data
}

async function postBooking(booking) {
    const response = await axios.post(
        `http://${url}/api/rooms/${booking.roomId}/bookings/`,
        {
            name: booking.name,
            phone: booking.phone,
            arrival_date: booking.arrival_date,
            departure_date: booking.departure_date,
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
    )
    return response
}

async function getBookingsRoomId(roomId) {
    const bookings = await axios.get(
        `http://${url}/api/rooms/${roomId}/bookings/`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
    if (bookings.data.data) {
        bookings.data.data.forEach(booking => {
            booking.roomId = roomId;
        })
    }
    return bookings.data
}

const api = {
    getRooms, postRoom, deleteRoom, getRoomByID, editRoom,
    getBookings, getBookingByID, postBooking, getBookingsRoomId
}

export default api;