import mongoose from 'mongoose'
import { cartModel } from './cart.model.js'

const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts',
    },
    role:{
        type:String,
        required:true,
        default:'user'
    },
})

userSchema.pre('save', async function (next) {
    if (!this.cart ) {
        try {
            const newCart = await cartModel.create({user: this._id});
            this.cart = newCart._id
        } catch (err) {
            return next(err)
        }
    }
    next()
})
export const userModel = mongoose.model('users', userSchema)
