import jwt from 'jsonwebtoken'

export const generateToken = ({ payload, secretKey = 'koko'}) => {
    return jwt.sign(payload, secretKey)
}

export const verifyToken = ({ token, secretKey = 'koko'}) => {
    try {
        return jwt.verify(token, secretKey)
    } catch (error) {
        return { message: error.message}
    }
    
}