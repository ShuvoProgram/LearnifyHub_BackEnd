const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const ErrorCode = require('../config/errorsCode');


class AppError extends Error {

    constructor(
        appCode = ErrorCode.DEFAULT_ERROR,
        errorMessage = ReasonPhrases.INTERNAL_SERVER_ERROR,
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    ) {
        super(errorMessage)
        this.appCode = appCode
        this.statusCode = statusCode
    }

    static validation(message = ReasonPhrases.BAD_REQUEST) {
        return new AppError(
            ErrorCode.VALIDATION_ERROR,
            message,
            StatusCodes.BAD_REQUEST
        )
    }

    static authentication(message = ReasonPhrases.UNAUTHORIZED) {
        return new AppError(
            ErrorCode.AUTHENTICATION_ERROR,
            message,
            StatusCodes.UNAUTHORIZED
        )
    }

    static forbidden(message = ReasonPhrases.FORBIDDEN) {
        return new AppError(
            ErrorCode.FORBIDDEN_ERROR,
            message,
            StatusCodes.FORBIDDEN
        )
    }

    static conflict(message = ReasonPhrases.CONFLICT) {
        return new AppError(
            ErrorCode.CONFLICT,
            message,
            StatusCodes.CONFLICT
        )
    }

    static database(message = ReasonPhrases.INTERNAL_SERVER_ERROR) {
        return new AppError(
            ErrorCode.DATABASE_ERROR,
            message,
            StatusCodes.INTERNAL_SERVER_ERROR
        )
    }

    static order(message = 'An unexpected error occured while processing your order') {
        return new AppError(
            ErrorCode.ORDER_ERROR,
            message,
            StatusCodes.INTERNAL_SERVER_ERROR
        )
    }

    static transaction(message = 'An unexpected error occured while processing your transaction') {
        return new AppError(
            ErrorCode.TRANSACTION_ERROR,
            message,
            StatusCodes.INTERNAL_SERVER_ERROR
        )
    }

    static testError(message = 'This is an test error') {
        return new AppError('1000', message, 400)
    }
}

module.exports = AppError;