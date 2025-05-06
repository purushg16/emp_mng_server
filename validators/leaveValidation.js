const yup = require("yup");

const createLeaveSchema = yup.object({
  from: yup.date().required("From date is required"),
  to: yup
    .date()
    .required("To date is required")
    .min(yup.ref("from"), "To date cannot be before from date"),
  leaveTypeId: yup.number().required("Leave type is required"),
  desc: yup.string().required("Description is required"),
});

// Leave Update Validation
const leaveUpdateSchema = yup.object({
  status: yup
    .string()
    .required("Status is required")
    .oneOf(
      ["approved", "declined"],
      'Status must be either "approved" or "declined"'
    ),

  remark: yup.string().trim().required("Remark is required"),
  // .matches(/^.*$/, "Remark must be a string"),
});

module.exports = { leaveUpdateSchema, createLeaveSchema };
