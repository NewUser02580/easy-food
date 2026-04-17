import mongoose from "mongoose";

export const connectDB =  async () => {
    await mongoose.connect(' mongodb+srv://202307030004_db_user:dhirshah11@cluster0.8hepl3a.mongodb.net/?appName=Cluster0')
    .then(()=>console.log("DB Connected"));
}
