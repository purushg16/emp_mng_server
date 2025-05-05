const { body } = require("express-validator");

// ADD Employee Validation (all required)
const addEmployeeValidation = [
  body("firstName").trim().notEmpty().withMessage("First name is required"),
  body("lastName").trim().notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be either 'active' or 'inactive'"),
  body("mobile")
    .isNumeric()
    .withMessage("Mobile must be numeric")
    .isLength({ min: 8, max: 15 })
    .withMessage("Mobile number must be between 8 and 15 digits"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("code").trim().notEmpty().withMessage("Employee code is required"),
  body("gender")
    .isIn(["male", "female", "others"])
    .withMessage("Gender must be male, female, or others"),
  body("birthday").isISO8601().withMessage("Valid birthday is required"),
  body("departmentId").isInt().withMessage("Valid department ID is required"),
  body("country").trim().notEmpty().withMessage("Country is required"),
  body("city").trim().notEmpty().withMessage("City is required"),
  body("address").trim().notEmpty().withMessage("Address is required"),
];

// UPDATE Employee Validation (all optional)
const updateEmployeeValidation = [
  body("firstName").optional().trim(),
  body("lastName").optional().trim(),
  body("email").optional().isEmail().withMessage("Valid email is required"),
  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be either 'active' or 'inactive'"),
  body("mobile")
    .optional()
    .isNumeric()
    .withMessage("Mobile must be numeric")
    .isLength({ min: 8, max: 15 })
    .withMessage("Mobile number must be between 8 and 15 digits"),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("code").optional().trim(),
  body("gender")
    .optional()
    .isIn(["male", "female", "others"])
    .withMessage("Gender must be male, female, or others"),
  body("birthday").optional().isISO8601().withMessage("Valid birthday"),
  body("departmentId").optional().isInt().withMessage("Valid department ID"),
  body("country").optional().trim(),
  body("city").optional().trim(),
  body("address").optional().trim(),
];

module.exports = {
  addEmployeeValidation,
  updateEmployeeValidation,
};
