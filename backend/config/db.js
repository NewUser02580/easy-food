import mongoose from "mongoose";

export const connectDB =  async () => {
    await mongoose.connect('mongodb+srv://easyfood:dhirshah11@cluster0.zvme33u.mongodb.net/food_del')
    .then(()=>console.log("DB Connected"));
}
