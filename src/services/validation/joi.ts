import joi from "@hapi/joi";

export default class Joi {
  public static newBike(user) {
    const schema = joi.object({
      title: joi.string().alphanum().min(3).max(50).required(),
      price: joi.number().integer().min(1).required(),
      category_id: joi.number().integer().required(),
    });
    return schema.validate(user);
  }
}
