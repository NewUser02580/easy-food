import mongoose from "mongoose";

export const connectDB =  async () => {
    await mongoose.connect('mongodb+srv://dhir2303:dhirshah11@cluster0.lb7rgyt.mongodb.net/Food_Del').then(()=>console.log("DB Connected"));
}