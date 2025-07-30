import passport from "passport"
import local from "passport-local"
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

    passport.use('register',new local.Strategy(
        {
            passReqToCallback: true,
            usernameField: 'email'
        },
        async (req, username, password, done) => {
            try {
                const { first_name,last_name } = req.body
                if (!first_name || !last_name || !username || !password) {
                    return done(null, false, { message: 'All fields are required' })
                }
                if (password.length < 6) {
                    return done(null, false, { message: 'Password must be at least 6 characters long' })
                }
                if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(username)) {
                    return done(null, false, { message: 'Invalid email format' })
                }
                if (!/^[a-zA-Z]+$/.test(first_name) || !/^[a-zA-Z]+$/.test(last_name)) {
                    return done(null, false, { message: 'First name and last name must contain only letters' })
                }
                if (first_name.length < 3 || last_name.length < 3) {
                    return done(null, false, { message: 'First name and last name must be at least 3 characters long' })
                }
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
        }) )

        passport.use('login', new local.Strategy(
            {
                usernameField: 'email'
            },
            async (username, password, done) => {
                try {
                    const user = await UserDao.getBy({ email: username })
                    if (!user) {
                        return done(null, false, { message: 'User not found' })
                    }
                    if (!validateHash(password, user.password)) {
                        return done(null, false, { message: 'Invalid credentials' })
                    }
                    done(null, user)
                } catch (error) {
                    done(error)
                }
            }))
}