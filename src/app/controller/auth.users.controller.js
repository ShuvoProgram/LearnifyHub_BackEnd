const userService = require('../services/user.service')
const attachTokenToCookie = require('../../utils/cookie.utils')
const AppError = require('../../utils/error.utils');
const asyncHandler = require("../../utils/async.handler.util");
const sendResponse = require("../../utils/sendResponse.utils");
const { signInSchema, signUpSchema } = require('../validation/auth.validator')
/**
* @desc User Sign in
* @route POST /auth/signin/
* @access public
*
* @body 
* {
*   "email": "user@gmail.com",
*   "password": "password123"
* }
*/

const handleSignIn = asyncHandler(async (req, res) => {
    const { error, value } = signInSchema.validate(req.body)
    if (error) {
        console.log(error.details[0].message)
        throw AppError.validation(error.details[0].message)
    }

    const {
        user,
        accessToken,
        refreshToken
    } = await userService.handleSignIn(value)

    attachTokenToCookie('accessToken', accessToken, res)
    attachTokenToCookie('refreshToken', refreshToken, res)

    console.log('user login successful. user is ', user.name)
    

    res.status(200).json({ message: 'Login successfull', user })
});

/**
* @desc user signup
* @route  POST /auth/signup
* @access public
*/

const handleSignUp = asyncHandler(async (req, res) => {
    const { error, value } = signUpSchema.validate(req.body)
    if (error) {
        throw AppError.validation(error.details[0].message)
    }
    const user = await userService.handleSignUp(value)

    console.log('New User has been registered - ', value.name, ' with email - ', value.email, ' with phone number', value.phone)

    sendResponse(res, {
        statusCode: 200,
      success: true,
      message: 'user created successfully!',
      data: user,
    })

});

module.exports = {
    handleSignIn,
    handleSignUp
}