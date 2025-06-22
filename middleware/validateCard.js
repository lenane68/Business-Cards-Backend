import Joi from "joi";

export default function validateCard(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().min(2).required(),
    subtitle: Joi.string().min(2).required(),
    description: Joi.string().min(2).required(),
    phone: Joi.string().pattern(/^0[2-9]\d{7,8}$/).required(),
    email: Joi.string().email({ tlds: false }).required(),
    web: Joi.string().uri().allow(""),
    image: Joi.object({
      url: Joi.string().uri().required(),
      alt: Joi.string().required(),
    }),
    address: Joi.object({
      state: Joi.string().allow(""),
      country: Joi.string().required(),
      city: Joi.string().required(),
      street: Joi.string().required(),
      houseNumber: Joi.number().required(),
      zip: Joi.string().allow(""),
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).send(error.details.map((d) => d.message).join(", "));
  }

  next();
}
