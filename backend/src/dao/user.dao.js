import { userModel } from "./models/user.model.js"

export class UserDao {
    static async get(){
        try {
            const users = await userModel.find().lean()
            return users
        } catch (error) {
            throw new Error('Error fetching users: ' + error.message)
        }
    }
    static async getBy(filter){
        try {
            const user = await userModel.findOne({...filter}).lean()
            return user
        } catch (error) {
            throw new Error('Error fetching user: ' + error.message)
        }
    }
}