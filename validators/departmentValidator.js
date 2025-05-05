const { body } = require("express-validator");

const departmentValidationRules = [
  body("code")
    .trim()
    .notEmpty()
    .withMessage("Dept. code is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Code must be at most 20 characters"),

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Dept. name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Name must be at most 100 characters"),

  body("shortName")
    .trim()
    .notEmpty()
    .withMessage("Short name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Short name must be at most 50 characters"),
];

const updateDepartmentValidationRules = [
  body("code")
    .optional()
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Code must be 3–20 characters"),

  body("name")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Name must be 3–100 characters"),

  body("shortName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Short name must be 2–50 characters"),
  body().custom((value) => {
    if (!value || Object.keys(value).length === 0) {
      throw new Error(
        "At least one field (type or description) must be provided"
      );
    }
    return true;
  }),
];

module.exports = { updateDepartmentValidationRules, departmentValidationRules };
