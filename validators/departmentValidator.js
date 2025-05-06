const yup = require("yup");

// Validation schema for department creation
const departmentSchema = yup.object({
  code: yup
    .string()
    .trim()
    .required("Dept. code is required")
    .min(3, "Code must be at least 3 characters")
    .max(20, "Code must be at most 20 characters"),

  name: yup
    .string()
    .trim()
    .required("Dept. name is required")
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must be at most 100 characters"),

  shortName: yup
    .string()
    .trim()
    .required("Short name is required")
    .min(3, "Short name must be at least 3 characters")
    .max(50, "Short name must be at most 50 characters"),
});

// Validation schema for updating a department
const updateDepartmentSchema = yup
  .object({
    code: yup
      .string()
      .optional()
      .trim()
      .min(3, "Code must be at least 3 characters")
      .max(20, "Code must be at most 20 characters"),

    name: yup
      .string()
      .optional()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(100, "Name must be at most 100 characters"),

    shortName: yup
      .string()
      .optional()
      .trim()
      .min(2, "Short name must be at least 2 characters")
      .max(50, "Short name must be at most 50 characters"),
  })
  .test(
    "at-least-one-field",
    "At least one field (code, name, or shortName) must be provided",
    function (value) {
      const { code, name, shortName } = value || {};
      return !!code || !!name || !!shortName;
    }
  );

module.exports = { departmentSchema, updateDepartmentSchema };
