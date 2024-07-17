const zod = require("zod");

const signUpBody = zod.object({
    username: zod.string().min(4),
    password: zod.string().min(4),
    firstName: zod.string().min(1),
    lastName: zod.string().min(1)
})

const signInBody = zod.object({
    username: zod.string().min(4),
    password: zod.string().min(4)
})

const updateBody = zod.object({
    username: zod.string().min(4).optional(),
    password: zod.string().min(4).optional(),
    firstName: zod.string().min(1).optional(),
})

module.exports = {
    signUpBody,
    signInBody,
    updateBody
};