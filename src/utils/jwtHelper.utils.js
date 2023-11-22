import jwt from 'jsonwebtoken';

const createAccessToken = (user, tutor = false) => {

    user.role = tutor ? 'tutor' : 'user'
    return jwt.sign(
        { user },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION })
}

const createAccessTokenAdmin = admin => {
    return jwt.sign(
        { role: 'admin' },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
    )
}

const createRefreshToken = (user) => {
    return jwt.sign(
        { user },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION }
    )
}

const verifyToken = (token, tokenSecret) => {
    return new Promise((resolve, reject) => {   
        jwt.verify(token, tokenSecret, (err, decoded) => {
            if (err) {
                return reject(err)
            }
            resolve(decoded)
        })
    })
}

export const jwtHelper = {
    createAccessToken,
    createAccessTokenAdmin,
    createRefreshToken,
    verifyToken
}