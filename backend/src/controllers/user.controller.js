
export class UserController {
    static async current(req, res) {
        try {
            res.json({ status: "success", payload: req.user })
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }
}