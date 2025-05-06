const yup = require("yup");

// ADD Employee Validation (all required)
const addEmployeeSchema = yup.object({
  firstName: yup.string().trim().required("First name is required"),
  lastName: yup.string().trim().required("Last name is required"),
  email: yup.string().email("Valid email is required").required(),
  status: yup
    .string()
    .oneOf(
      ["active", "inactive"],
      "Status must be either 'active' or 'inactive'"
    )
    .optional(),
  mobile: yup
    .string()
    .matches(/^\d+$/, "Mobile must be numeric")
    .length(10, "Mobile number must be between 8 and 15 digits")
    .min(8, "Mobile number must be between 8 and 15 digits")
    .max(15, "Mobile number must be between 8 and 15 digits")
    .required(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required(),
  code: yup.string().trim().required("Employee code is required"),
  gender: yup
    .string()
    .oneOf(
      ["male", "female", "others"],
      "Gender must be male, female, or others"
    )
    .required(),
  birthday: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Valid birthday is required")
    .required(),
  departmentId: yup
    .number()
    .integer("Valid department ID is required")
    .required(),
  country: yup.string().trim().required("Country is required"),
  city: yup.string().trim().required("City is required"),
  address: yup.string().trim().required("Address is required"),
});

// UPDATE Employee Validation (all optional)
const updateEmployeeSchema = yup.object({
  firstName: yup.string().trim().optional(),
  lastName: yup.string().trim().optional(),
  email: yup.string().email("Valid email is required").optional(),
  status: yup
    .string()
    .oneOf(
      ["active", "inactive"],
      "Status must be either 'active' or 'inactive'"
    )
    .optional(),
  mobile: yup
    .string()
    .matches(/^\d+$/, "Mobile must be numeric")
    .length(10, "Mobile number must be between 8 and 15 digits")
    .min(8, "Mobile number must be between 8 and 15 digits")
    .max(15, "Mobile number must be between 8 and 15 digits")
    .optional(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
  code: yup.string().trim().optional(),
  gender: yup
    .string()
    .oneOf(
      ["male", "female", "others"],
      "Gender must be male, female, or others"
    )
    .optional(),
  birthday: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Valid birthday")
    .optional(),
  departmentId: yup.number().integer("Valid department ID").optional(),
  country: yup.string().trim().optional(),
  city: yup.string().trim().optional(),
  address: yup.string().trim().optional(),
});

module.exports = {
  addEmployeeSchema,
  updateEmployeeSchema,
};
