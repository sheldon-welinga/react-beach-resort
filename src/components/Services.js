import React from 'react';
import {FaCocktail, FaHiking, FaShuttleVan, FaBeer} from "react-icons/fa";

import {Title }from "./Title";

export const Services = () => {
    let serviceItems = [
        {
            id: 1,
            icon: <FaCocktail />,
            title: "Free Cocktails",
            info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit esse eaque dicta numquam quidem"
        },
        {
            id: 2,
            icon: <FaHiking />,
            title: "Endless Hiking",
            info: "Commodi distinctio, tenetur illo enim iste saepe quae sed cum expedita sint." 
        },
        {
            id: 3,
            icon: <FaShuttleVan />,
            title: "Free Shuttle",
            info: "Obcaecati consectetur cupiditate maiores neque maxime expedita porro laboriosam ipsa nostrum quia numquam amet." 
        },
        {
            id: 4,
            icon: <FaBeer />,
            title: "Strongest Beer",
            info: "Placeat odio aperiam sapiente tempora, rerum iste unde perspiciatis id necessitatibus!"
        }
    ];
    return (
        <section className="services">
           <Title title="services" />
           <div className="services-center">
               {
                   serviceItems.map((item)=>{
                        return (
                            <article className="service" key={item.id}>
                                <span>{item.icon}</span>
                                <h6>{item.title}</h6>
                                <p>{item.info}</p>
                            </article>
                        )
                   })
               }
           </div>
        </section>
    )
}
