const Joi = require('joi')

const objectIdSchema = Joi
    .string()
    .hex()
    .length(24)
    .required()
    .messages({
        'string.empty': 'ID is required',
        'string.length': 'Inavalid Id'
    })

const validateParams = (req, res, next) => {
    const ObjectId = req.params.id
    console.log(ObjectId)
    const { error } = objectIdSchema.validate(ObjectId)
    if (error) {
        return res.status(400).json({ error: error.details[0].message , message: `'${ObjectId}' - is Invalid Id` });
    }
    next()
}

module.exports = {
    validateParams
}