import { Joi } from 'celebrate'

export default Joi.object().keys({
    cart_id: Joi.number().integer().required(),
    shipping_id: Joi.number().integer().required(),
    tax_id: Joi.number().integer(),
    comment: Joi.string().min(5).max(50).trim()
})