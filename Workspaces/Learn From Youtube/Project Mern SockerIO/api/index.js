import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.route.js';
import messageRoute from './routes/message.route.js';
import userRoute from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import { app, server } from './socket/socket.js';

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/messages', messageRoute);
app.use('/api/users', userRoute);

const PORT = process.env.PORT || 3000;
mongoose
    .connect(process.env.URL)
    .then(() => {
        console.log('MongoDb is connected');
        server.listen(PORT, () => {
            console.log('Api running on port 3000');
        });
    })
    .catch((err) => console.log(err));
