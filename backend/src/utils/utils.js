import bcrypt from "bcrypt";
import __dirname from "../utilRoute.js";
export const passwordHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10))

export const validateHash = (password, hash) => bcrypt.compareSync(password,hash)

import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${__dirname}/public/img`)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

export const uploader = multer({ storage: storage })