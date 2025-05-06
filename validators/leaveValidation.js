const yup = require("yup");

// Leave Update Validation
const leaveUpdateSchema = yup.object({
  status: yup
    .string()
    .required("Status is required")
    .oneOf(
      ["approved", "declined"],
      'Status must be either "approved" or "declined"'
    ),

  remark: yup.string().trim().optional(),
  // .matches(/^.*$/, "Remark must be a string"),
});

module.exports = { leaveUpdateSchema };
