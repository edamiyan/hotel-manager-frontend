import SignIn from "../pages/Sign-in";
import SignUp from "../pages/Sign-up";
import Rooms from "../pages/Rooms";
import RoomDetail from "../pages/RoomDetail";
import BookingDetail from "../pages/BookingDetail";
import Main from "../pages/Main";

export const privateRoutes = [
    {path: '/home', component: Main, exact: true},
    {path: '/rooms', component: Rooms, exact: true},
    {path: '/rooms/:id', component: RoomDetail, exact: true},
    {path: '/rooms/:roomId/booking/:bookingId', component: BookingDetail, exact: true},
]

export const publicRoutes = [
    {path: '/sign-in', component: SignIn, exact: false},
    {path: '/sign-up', component: SignUp, exact: false},
]

