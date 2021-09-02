import React, {useState} from 'react';

const RoomFormEdit = (props) => {
    const [room, setRoom] = useState({
        room_number: props.room.room_number,
        double_bed: props.room.double_bed,
        single_bed: props.room.single_bed,
        price: props.room.price,
        description: props.room.description
    })

    const editRoom = (e) => {
        e.preventDefault()
        props.edit(room);
        props.handleClose();
        setRoom({
            room_number: '',
            double_bed: '',
            single_bed: '',
            price: '',
            description:''
        })
    }

    return (
        <form>
            <div className="form-group mt-2">
                <input className="form-control"
                       value={room.room_number}
                       onChange={e => setRoom({...room, room_number: e.target.value})}
                       type="text"
                       placeholder="Номер комнаты"
                />
            </div>
            <div className="form-group mt-2">
                <input className="form-control"
                       value={room.double_bed}
                       onChange={e => setRoom({...room, double_bed: e.target.value})}
                       type="text"
                       placeholder="Количество двуспальных мест"
                />
            </div>
            <div className="form-group mt-2">
                <input className="form-control"
                       value={room.single_bed}
                       onChange={e => setRoom({...room, single_bed: e.target.value})}
                       type="text"
                       placeholder="Количество односпальных мест"
                />
            </div>
            <div className="form-group mt-2">
                <input className="form-control"
                       value={room.price}
                       onChange={e => setRoom({...room, price: e.target.value})}
                       type="text"
                       placeholder="Стоимость проживания (сутки)"
                />
            </div>
            <div className="form-group mt-2">
                <textarea
                    value={room.description}
                    onChange={e => setRoom({...room, description: e.target.value})}
                    type="text"
                    placeholder="Описание"
                    className="form-control" rows="4"></textarea>
            </div>

            <button type={"submit"} className="btn btn-primary mt-2" onClick={editRoom}>Сохранить изменения</button>
        </form>
    );
};

export default RoomFormEdit;