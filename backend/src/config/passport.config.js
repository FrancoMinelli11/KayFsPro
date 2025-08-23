import passport from "passport"
import local from "passport-local"
import passportJWT from "passport-jwt"
import { config } from "../config/config.js"
import { passwordHash, validateHash } from "../utils/utils.js"
import { UserDao } from "../dao/user.dao.js"
import { AuthDao } from "../dao/auth.dao.js"

const cookieExtractor = req => {
    let token = null
    if (req && req.cookies) {
        token = req.cookies['jwt']
    }
    return token
}
export const initializePassport = () => {

    passport.use('register', new local.Strategy(
        {
            passReqToCallback: true,
            usernameField: 'email'
        },
        async (req, username, password, done) => {
            try {
                const { first_name, last_name } = req.body
                let user = await UserDao.getBy({ email: username })
                if (user) {
                    return done(null, false, { message: 'User already exists' })
                }
                password = passwordHash(password)
                user = await AuthDao.post({ email: username, password, first_name, last_name })
                done(null, user)
            } catch (error) {
                done(error)
            }
        }))

    passport.use('login', new local.Strategy(
        {
            usernameField: 'email'
        },
        async (username, password, done) => {
            try {
                const user = await UserDao.getBy({ email: username })
                if (!user || !validateHash(password, user.password)) {
                    return done(null, false, { message: 'Invalid credentials' })
                }
                done(null, user)
            } catch (error) {
                done(error)
            }
        }))

    passport.use('current', new passportJWT.Strategy({
        jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: config.TOKEN_JWT
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            done(error)
        }
    }))
}