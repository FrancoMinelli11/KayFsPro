import passport from "passport"

export const authMiddleware = (req, res, next) => {
    if(req.user.role === 'admin') {
        return next()
    }
    return res.status(403).json({ message: 'Unauthorized' })
}

export const registerMiddleware = (req, res, next) => {
    passport.authenticate('register', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({ status: 'error', message: info.message || 'Registration failed' })
        }
        req.user = user
        next()
    })(req, res, next)
}

export const loginMiddleware = (req,res,next) => {
    passport.authenticate('login', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({ status: 'error', message: info.message || 'Login failed' })
        }
        req.user = user
        next()
    })(req, res, next)
}