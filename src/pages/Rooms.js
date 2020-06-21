import React from 'react';
import {Link} from "react-router-dom";

import {Hero} from "../components/Hero";
import {Banner} from "../components/Banner";
import RoomsContainer from "../components/RoomsContainer";

const Rooms = () => {
    return (
        <React.Fragment>
            <Hero hero="roomsHero">
                <Banner title="our rooms" >
                    <Link to="/" className="btn-primary">Return Home</Link>
                </Banner>
            </Hero>
            <RoomsContainer />
        </React.Fragment>
    )
}

export default Rooms
