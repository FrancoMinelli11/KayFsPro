import bcrypt from "bcrypt";

export const passwordHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10))

export const validateHash = (password, hash) => bcrypt.compareSync(password,hash)

import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./src/public/img`)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

export const uploader = multer({ storage: storage })