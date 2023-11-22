// import { Response } from 'express';

const sendResponse = (res, data) => {
    const responseData = {
        status: data.statusCode,
        success: data.success,
        message: data.message || null,
        meta: data.meta || null || undefined,
        data: data.data || null,
    }

    res.status(data.statusCode).json(responseData);
};

export default sendResponse;
