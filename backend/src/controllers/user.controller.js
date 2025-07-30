import { userModel } from "../dao/models/user.model.js";
import { UserDao } from "../dao/user.dao.js";
export class UserController {
    static async getAllUsers(req, res) {
        try {
            const users = await UserDao.get()
            res.json({ status: 'success', payload: users });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }
}