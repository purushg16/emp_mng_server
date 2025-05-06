const { error } = require("../utils/response");

const validate = (schema) => async (req, res, next) => {
  try {
    req.body = await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    next();
  } catch (err) {
    const primaryError = err.errors[0];
    error(res, primaryError, 400);

    res.status(400).json({
      errors: err.inner.map((e) => ({
        path: e.path,
        message: e.message,
      })),
    });
  }
};

module.exports = validate;
