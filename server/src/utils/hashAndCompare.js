import bcryptjs from "bcryptjs"
export const hashPassword = ({ plainText, salt = process.env.HASH_SALT } = {}) => {
    const hash = bcryptjs.hashSync(plainText, parseInt(salt))
    return hash
}
export const comparePassword = ({ plainText, hashedValue } = {}) => {
    const match = bcryptjs.compareSync(plainText, hashedValue)
    return match
}