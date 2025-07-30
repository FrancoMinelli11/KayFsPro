import {userModel} from '../dao/models/user.model.js'
export class AuthDao {
    static async post(user){
        try {
            const newUser = await userModel.create(user)
            if (!newUser) {
                throw new Error('User creation failed')
            }
            newUser.password = undefined // Remove password from the response
            return newUser
        } catch (error) {
            throw new Error('Error creating user: ' + error.message)
        }
    }
}