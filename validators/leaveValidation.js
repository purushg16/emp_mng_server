const { body } = require("express-validator");

const leaveUpdateValidation = [
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["approved", "declined"])
    .withMessage("Status must be either 'approved' or 'declined'"),
  body("remark")
    .optional()
    .trim()
    .isString()
    .withMessage("Remark must be a string"),
];

module.exports = { leaveUpdateValidation };
