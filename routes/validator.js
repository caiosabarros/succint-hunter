const { body, validationResult } = require('express-validator')
const validationRules = () => {
    return [
        // first element are platform-specific validation rules  
        [
            // name must be at least 3 chars.
            body('name').isLength({ min: 3 }),
            // web3 must be a boolean.
            body('web3').isBoolean(),
            body('url').isURL(),
            // description must have min length of 10 chars.
            body('description').isLength({ min: 10 }),
        ],
        // second element are project-specific validation rules
        [
            body('assets').isArray(),
            body('language').notEmpty(),
            body('slug').notEmpty(),
            body('githubUrl').isURL(),
            body('description').isLength({ min: 10 }),
            body('maxBounty').isNumeric()
        ]
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    validationRules,
    validate,
}