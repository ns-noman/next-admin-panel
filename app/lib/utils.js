import mongoose from "mongoose";

export const conncetToDB = async ()=> {
    const connection = {}
    try{
        if(connection.isConnected) return;
        const db = await mongoose.connect(process.env.MONGO);
        connection.isConnected = db.connections[0].readyState;
    }catch(error){
        console.log(error);
        
        throw new Error(error);
    }
}