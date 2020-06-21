import React, {Component} from "react";

// import items from "./data";
import Client from "./Contentful";

// Client.getEntries({
//     content_type: "beachResortRooms" 
// }).then((res)=> console.log(res.items));

const RoomContext = React.createContext();
// <RoomContext.Provider value={} />

class RoomProvider extends Component{
    state ={
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: "all",
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    };

    //getData

    getData = async ()=>{
        try{
            //getting response of beachResortRooms from the contentful API
           let response = await Client.getEntries({content_type: "beachResortRooms", order: "sys.createdAt"}) ;

           let rooms = this.formatData(response.items);
            let featuredRooms = rooms.filter((room)=> room.featured ===true);

            let maxPrice = Math.max(...rooms.map(item => item.price));
            let maxSize = Math.max(...rooms.map(item => item.size));


            this.setState({
                rooms,
                featuredRooms,
                sortedRooms: rooms,
                loading: false,
                price: maxPrice,
                maxPrice,
                maxSize
            })


        } catch(err){
            console.log(err)
        }
    }

    componentDidMount(){
        this.getData()
        
    }

    //Diplsy clean data from the raw data given
    formatData(items){
        let tempItems = items.map((item)=>{
            let id = item.sys.id;
            let images = item.fields.images.map((image)=> image.fields.file.url);
            let room = {...item.fields, images,id};

            return room;
        });
        return tempItems;
    }

    //Getting a specific room
    getRoom = (slug) =>{
        let tempRooms =[...this.state.rooms];
        const foundRoom = tempRooms.find((room) => room.slug === slug);
        
        return foundRoom;
    }

    handleChange =(e)=>{
        const target = e.target;
        const value = target.type === "checkbox"? target.checked : target.value;
        const name = e.target.name;

        this.setState({
            [name]: value
        }, this.filterRooms)
      
    }

    filterRooms = ()=>{
        let {rooms, type, capacity, price, minSize, maxSize, breakfast, pets} = this.state;

        // all the rooms
        let tempRooms = [...rooms];
        // transform values
        capacity = parseInt(capacity);
        price = parseInt(price);

        // filter by type
        if(type !=='all'){
           tempRooms = tempRooms.filter(room => room.type === type);
        }

        // filter by capacity
        if(capacity !==1){
            tempRooms = tempRooms.filter(room =>room.capacity >= capacity)
        }

        // filter by price
        tempRooms = tempRooms.filter(room => room.price <= price);

        // filter by room size
        tempRooms = tempRooms.filter(room => room.size >=minSize && room.size<=maxSize);

        //filter by breakfast
        if(breakfast){
            tempRooms = tempRooms.filter(room => room.breakfast === true);
        }

        //filter by pets
        if(pets){
            tempRooms = tempRooms.filter(room => room.pets === true);
        }
        //change state
        this.setState({
            sortedRooms: tempRooms
        })
    }

    render(){

        return (
            <RoomContext.Provider value={{...this.state, getRoom: this.getRoom, handleChange: this.handleChange}}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export const withRoomConsumer =(Component)=>{
    return (props)=> <RoomConsumer>
        {
            roomdetails => <Component {...props} context={roomdetails} />
        }
    </RoomConsumer>
}

export {RoomProvider, RoomConsumer, RoomContext};