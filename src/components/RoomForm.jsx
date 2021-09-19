import React, {useState} from 'react';

const RoomForm = ({create}) => {
    const [room, setRoom] = useState({
        id: '',
        room_number: '',
        double_bed: '',
        single_bed: '',
        price: '',
        description:''
    })

    const addNewRoom = (e) => {
        e.preventDefault()
        create(room);
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

            <button type={"submit"} style={{backgroundColor: '#06276F', color: 'white'}} className="btn mt-2" onClick={addNewRoom}>Создать комнату</button>
        </form>
    );
};

export default RoomForm;