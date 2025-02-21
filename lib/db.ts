
import mongoose from "mongoose";
const MONGODB_URI=process.env.MONGODB_URI!;

if(!MONGODB_URI){
  throw new Error("Please define mongodb url in .env file");
}

//Checking if the connection there or not
let cached=global.mongoose;

// if there is no object like mongoose or anything like cached
if(!cached){
  cached=global.mongoose={conn: null, promise: null};
}

//Now let's just Connect
export async function connectToDatabase() {
  //if connection is already present
  if(cached.conn){
     return cached.conn
}
  //if there is no promises too
  if(!cached.promise){
    const opts={
      bufferCommands: true,//tells whether to hold queries when the database is not connected
      maxPoolSize: 10//total connection establish in one go
    }

    //if promise is there then connect it to mongoose
    cached.promise=mongoose
    .connect(MONGODB_URI,opts)
    .then(()=>mongoose.connection);
  }

  // if the connection is already in promise
  try{
    cached.conn=await cached.promise;
  }catch(error){
    cached.promise=null;
    throw error;
  }
  return cached.conn;

}


