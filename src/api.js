import axios from "axios";

async function getRooms(token) {
    const rooms = await axios.get(
        'http://192.168.0.14:8080/api/rooms/',
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
    console.log(rooms.data)
    return rooms.data
}

async function postRoom(token, room) {
    const response = await axios.post(
        'http://192.168.0.14:8080/api/rooms/',
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

async function deleteRoom(token, id) {
    const response = await axios.delete(
        `http://192.168.0.14:8080/api/rooms/${id}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
    return response
}

async function editRoom(token, id, fields) {
    const response = await axios.put(
        `http://192.168.0.14:8080/api/rooms/${id}`,
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

async function getRoomByID(token, id) {
    const room = await axios.get(
        `http://192.168.0.14:8080/api/rooms/${id}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
    return room.data
}

async function getBookings(token, roomId) {
    const bookings = await axios.get(
        `http://192.168.0.14:8080/api/rooms/${roomId}`+`/bookings/`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
    return bookings.data
}

async function getBookingByID(token, roomId, bookingId) {
    const bookings = await axios.get(
        `http://192.168.0.14:8080/api/rooms/${roomId}`+`/bookings/${bookingId}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
    return bookings.data
}

const api = {getRooms, postRoom, deleteRoom, getRoomByID, editRoom,
    getBookings, getBookingByID}

export default api;