import React, {Component} from 'react';

import {RoomContext} from "../context";
import {Loading} from "./Loading";
import Room from "./Room";
import {Title} from "./Title";

class FeaturedRooms extends Component{
    render(){
        let {loading, featuredRooms} = this.context;
        
        featuredRooms = featuredRooms.map((room)=>{
            return <Room key={room.id} room={room} />
        })

        return(
            <section className="featured-rooms">
                <Title title="featured rooms" />
                <div className="featured-rooms-center">
                    {
                        loading ? <Loading /> : featuredRooms
                    }
                </div>                
            </section>
        )
    }
}

FeaturedRooms.contextType = RoomContext;
export default FeaturedRooms
