import mongoose from "mongoose";

export const connectDB =  async () => {
    await mongoose.connect('mongodb+srv://easy-food:dhirshah12@cluster0.xgl1wky.mongodb.net/food_del')
    .then(()=>console.log("DB Connected"));
}
