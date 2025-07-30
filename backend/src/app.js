import express from 'express'
import { config } from './config/config.js'
import mongoose from 'mongoose'
import { router as userRouter} from './routes/user.router.js'
import {router as authRouter} from './routes/auth.router.js'
import { router as productRouter } from './routes/product.router.js';
import passport from 'passport'
import cookieParser from 'cookie-parser'
import { initializePassport } from './config/passport.config.js'

const app = express()
const port = config.PORT
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('backend/src/public'))
initializePassport()
app.use(passport.initialize())
app.use(cookieParser())
const connect = async () => {
    try {
        await mongoose.connect(config.MONGO,{
            dbName: 'KayFsPro'
        })
        console.log('Connected to DataBase')
        app.listen(port,() => {
            console.log('App listen on port: ' + port)
        })
    } catch (error) {
        console.log(error)
    }
}
connect();

app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/product', productRouter)