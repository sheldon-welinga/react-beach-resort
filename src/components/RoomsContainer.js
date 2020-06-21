import React from 'react';
import RoomsFilter from "./RoomsFilter";
import RoomList from "./RoomList";
// import {RoomConsumer} from "../context";
import {withRoomConsumer} from "../context";
import {Loading} from "./Loading";

const RoomContainer = ({context})=>{
    // console.log(context)
    const {loading, sortedRooms, rooms} = context;

    if(loading){
        return <Loading />
    }

    return(
        <React.Fragment>
            <RoomsFilter rooms ={rooms}/>
            <RoomList rooms={sortedRooms} />
        </React.Fragment>
    )

}

export default withRoomConsumer(RoomContainer);

/*
export const RoomsContainer = () => {
    return (
        <RoomConsumer>
            {
                (roomdetails) => {
                    console.log(roomdetails);
                    const {loading, sortedRooms, rooms} = roomdetails;

                    if(loading){
                        return <Loading />
                    }

                    return(
                        <div>
                            Hello from Rooms Container
                            <RoomsFilter rooms ={rooms}/>
                            <RoomList rooms={sortedRooms} />
                        </div>
                    )
                }
            }
        </RoomConsumer>
    )
} */
