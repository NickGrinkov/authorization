import express from 'express';
import mongoose from 'mongoose';
import authRouter from './authRouter.js';

const app = express();
app.use(express.json());
app.use('/auth', authRouter);

const PORT = process.env.PORT || 5000;
const URL = 'mongodb+srv://nick:nick@cluster0.fi2cpih.mongodb.net/?retryWrites=true&w=majority';

const start = async () => {
    try {
        await mongoose.connect(URL);
        app.listen(PORT, () => {
            console.log(`Server started on ${PORT}`)
        })
    } catch (error) {
        console.log(error);
    }
};

start();
