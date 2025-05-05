const { check, body } = require("express-validator");

const leaveTypeValidator = [
  check("type")
    .trim()
    .notEmpty()
    .isLength({ min: 2, max: 50 })
    .withMessage("Leave type is required"),
  check("description")
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage("Description is too long"),
];

const leaveTypeUpdateValidator = [
  check("type")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Leave type cannot be empty"),
  check("description")
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage("Description is too long"),
  body().custom((value) => {
    if (!value || Object.keys(value).length === 0) {
      throw new Error(
        "At least one field (type or description) must be provided"
      );
    }
    return true;
  }),
];

module.exports = { leaveTypeValidator, leaveTypeUpdateValidator };
