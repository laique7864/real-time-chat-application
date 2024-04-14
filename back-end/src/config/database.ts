import mongoose from 'mongoose'

 async function Connect() {
    console.log(process.env.MONGO_URI);
  const db = await  mongoose.connect("mongodb://localhost:27017/chatApp")
  console.log("db connected"); 
  return db
}
 export default Connect;
