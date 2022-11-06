import express from 'express';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server started on ${PORT}`)
        })
    } catch (error) {
        console.log(error);
    }
};

start();
