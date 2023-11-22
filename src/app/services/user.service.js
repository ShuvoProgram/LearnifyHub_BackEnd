const userRepository = require('../repository/users.repository');
const AppError = require('../../utils/error.utils')
const { comparePasswords, createHashPassword } = require('../../utils/bcrypt.utils')
const {createAccessToken, createAccessTokenAdmin, createRefreshToken, verifyToken} = require("../../utils/jwtHelper.utils");

/**
 * Handles user sign-in.
 * @param {Object} credentials - User credentials. {email: string, password: string}
 * @returns {Promise<Object>} - Object with user data, access token, and refresh token.
 */

const handleSignIn = async ({ email, password }) => {
    let user = await userRepository.findUserByEmail(email)
    if (!user) throw AppError.validation('Email not registered')

    const isPasswordMatch = await comparePasswords(password, user.password)
    if (!isPasswordMatch) throw AppError.validation('Invalid Password')

    const isBlocked = await userRepository.checkIsBlocked(email)
    if (isBlocked) throw AppError.forbidden('Access denied')

    const { password: _, ...userWithoutPassword } = user.toObject()

    const accessToken = createAccessToken(userWithoutPassword)
    const refreshToken = createRefreshToken(userWithoutPassword)

    // commented until until database refresh token cleanUp is implemented
    await userRepository.addRefreshTokenById(user._id, refreshToken)

    return {
        user: userWithoutPassword,
        accessToken,
        refreshToken
    }
}

const handleSignUp = async ({ name, password, phone, email }) => {
    const isEmailTaken = await userRepository.findUserByEmail(email)
    if (isEmailTaken) {
        throw AppError.conflict('Email is already taken')
    }

    const isPhoneTaken = await userRepository.findUserByPhone(phone)
    if (isPhoneTaken) {
        throw AppError.conflict('Phone number is already taken')
    }

    const hashedPassword = await createHashPassword(password)

    const user = await userRepository.createUser({
        name,
        password: hashedPassword,
        phone,
        email
    })

    return user
}

module.exports = {
    handleSignIn,
    handleSignUp
}
