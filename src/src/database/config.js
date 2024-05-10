import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        await mongoose.connect("mongodb+srv://ernestoleimsieder:CoderCoder@cluster0.ycrhk4t.mongodb.net/ecommerce")
        console.log("BD online!!!")
    } catch(error) {
        console.log(`Error raising database ${error}`);
    }
}