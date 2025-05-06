const yup = require("yup");

// Leave Type Validation (required fields)
const leaveTypeSchema = yup.object({
  type: yup
    .string()
    .trim()
    .required("Leave type is required")
    .min(2, "Leave type must be at least 2 characters")
    .max(50, "Leave type must be at most 50 characters"),

  description: yup
    .string()
    .trim()
    .max(255, "Description is too long")
    .optional(),
});

// Leave Type Update Validation (optional fields)
const leaveTypeUpdateSchema = yup
  .object({
    type: yup.string().trim().min(2).max(50).optional(),
    description: yup
      .string()
      .trim()
      .max(255, "Description is too long")
      .optional(),
  })
  .test(
    "at-least-one-field",
    "At least one field (type or description) must be provided",
    function (value) {
      const { type, description } = value || {};
      return !!type || !!description;
    }
  );

module.exports = { leaveTypeSchema, leaveTypeUpdateSchema };
