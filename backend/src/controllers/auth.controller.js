import { config } from "../config/config.js"
import jwt from "jsonwebtoken"

export class AuthController {

    static async register(req, res){
        try{
            const user = req.user
            if (!user) {
                return res.status(400).json({status:'error',message:'User registration failed'})
            }
            res.status(201).json({status:'success',payload:user})
        }catch(error){
            res.status(500).json({status:'error',message:error.message})
        }
    }

    static async login(req,res){
        const user = req.user
        try {
            delete user.password
            const token = jwt.sign({_id: user._id,email:user.email,role:user.role}, config.TOKEN_JWT,{expiresIn: 60 * 60 })
            res.cookie('jwt', token, {httpOnly: true})
            res.json({status:'success',payload:user})
        } catch (error) {
            res.status(500).json({status:'error',message:error.message})
        }
    }

    static async logout(req, res) {
        try {
            res.clearCookie('jwt')
            res.json({status: 'success', message: 'Logged out successfully'})
        } catch (error) {
            res.status(500).json({status: 'error', message: error.message})
        }
    }
}