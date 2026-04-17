import mongoose from "mongoose";

export const connectDB =  async () => {
    await mongoose.connect('mongodb+srv://easyfood:dhirshah11@cluster0.zvme33u.mongodb.net/? ')
    .then(()=>console.log("DB Connected"));
}
