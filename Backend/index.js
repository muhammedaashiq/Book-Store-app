import express, { response } from 'express';
import { PORT, mongoURL } from './config.js';
import bookRoute from './routes/bookRoutes.js'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()

app.use(express.json())

// app.use(
//     cors({
//         origin:'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type']
//     })
// )

app.use(cors())

app.use('/books', bookRoute)

mongoose
    .connect(mongoURL)
    .then(()=>{
        console.log("App connected to database")
        app.listen(PORT, ()=> {
            console.log(`App is listening to port ${PORT}`)
        })
    })
    .catch((err) => {
        console.error(err);
    })